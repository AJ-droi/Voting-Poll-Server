import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, confirmPassword, name } = req.body;
    try {
      const token = await this.authService.registerAgent(email, password, confirmPassword, name);
      await this.authService.sendVerificationEmail(email, token); // Send verification email
      res.status(201).json({ message: "Registration successful. Verify your email.", token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.loginAgent(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.params; // Token from verification link
      await this.authService.verifyEmail(token);
      res.status(200).json({ message: "Email verified successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.sendPasswordResetEmail(email);
      res.status(200).json({ message: "Password reset email sent successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body; // Reset token and new password
      await this.authService.resetPassword(token, newPassword);
      res.status(200).json({ message: "Password reset successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default AuthController;
