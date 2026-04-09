import passport from "passport";
import jwt from "jsonwebtoken";
import { Req, Res } from "../../interfaces/reqAndReq.interface";

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req: Req, res: Res) => {
    const user: any = req.user;

    if (!user) {
      res.redirect("/login");
      return;
    }

    const token = jwt.sign(
      { id: user.id, fullName: user.fullName },
      String(process.env.JWT_PASSWORD2),
      { expiresIn: "7d" }
    );

    res.cookie("userToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: String(process.env.ENVIROIMENT) == "dev" ? false : true,
      sameSite: "lax",
    });
    res.redirect("http://localhost:5173");
  },
];