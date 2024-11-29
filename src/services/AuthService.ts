import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthService {
  private secretKey = process.env.JWT_SECRET || "yourSecretKey";
  private transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  public async registerAgent(email: string, password: string, confirmPassword: string, name: string): Promise<string> {
    if (password !== confirmPassword) throw new Error("Passwords do not match.");

    const existingUser = await prisma.agent.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email is already registered.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, this.secretKey, { expiresIn: "1d" });

    await prisma.agent.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isVerified: false,
        verificationToken,
      },
    });

    await this.sendVerificationEmail(email, verificationToken);
    return "Registration successful. Please verify your email.";
  }

  public async loginAgent(email: string, password: string): Promise<string> {
    const user = await prisma.agent.findUnique({ where: { email } });
    if (!user) throw new Error("User not found.");
    if (!user.isVerified) throw new Error("Email not verified.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials.");

    const token = jwt.sign({ email, id: user.id }, this.secretKey, { expiresIn: "1h" });
    return token;
  }

  public async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
  }

  public async verifyEmail(token: string): Promise<void> {
    try {
      const payload = jwt.verify(token, this.secretKey) as { email: string };

      console.log({payload})

      const user = await prisma.agent.findUnique({ where: { email: payload.email } });
      if (!user) throw new Error("Invalid verification token.");

      await prisma.agent.update({
        where: { email: payload.email },
        data: { isVerified: true, verificationToken: null },
      });
    } catch (error) {
      throw new Error("Invalid or expired verification token.");
    }
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await prisma.agent.findUnique({ where: { email } });
    if (!user) throw new Error("User not found.");

    const resetToken = jwt.sign({ email }, this.secretKey, { expiresIn: "1h" });

    await prisma.agent.update({
      where: { email },
      data: { passwordResetToken: resetToken, passwordResetExpires: new Date(Date.now() + 3600 * 1000) },
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = jwt.verify(token, this.secretKey) as { email: string };

      const user = await prisma.agent.findUnique({
        where: { email: payload.email },
      });

      if (!user || user.passwordResetToken !== token || (user.passwordResetExpires && new Date() > user.passwordResetExpires)) {
        throw new Error("Invalid or expired password reset token.");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.agent.update({
        where: { email: payload.email },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      });
    } catch (error) {
      throw new Error("Failed to reset password.");
    }
  }
}

export default AuthService;
