const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { wallet, User } = require("../Models");
const installer = require("../Models/installer_auth");
const {
  AddOnResultInstance,
  AddOnResultPage,
} = require("twilio/lib/rest/api/v2010/account/recording/addOnResult");

exports.sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const Installer = await installer.findOne({ mobile: mobileNumber });
    if (Installer) {
      return res.status(201).json({
        message: "Mobile Number is already register.",
      });
    }
    const otpSecret = Math.floor(100000 + Math.random() * 900000);
    console.log(otpSecret);
    const data = {
      mobile: mobileNumber,
      otpSecret: otpSecret,
    };
    const result = await installer.create(data);
    await wallet.create({ installer: result._id, user_type: "installer", });
    res.status(200).json({ message: "OTP sent successfully", otp: result.otpSecret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await installer.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Installer Email not register " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password Not Match",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY);

    res.status(201).json({ token: token, InstallerId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { otpSecret } = req.body;
    const user = await installer.findOne({ otpSecret });

    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    //   const isValid = speakeasy.totp.verify({
    //     secret: otpSecret,
    //     encoding: 'base32',
    //     token: otp,
    //     window: 6
    //   });

    //   if (!isValid) {
    //     user.otpAttempts += 1;

    //     if (user.otpAttempts >= 3) {
    //       await User.deleteOne({ _id: user._id });
    //       return res.status(401).json({ message: 'Account locked' });
    //     }

    //     await user.save();

    //     return res.status(401).json({ message: 'Invalid OTP' });
    //   }

    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY);

    res
      .status(200)
      .json({ message: "Otp Verify ", token: token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.UpdateProfile = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    result.name = req.body.name;
    result.email = req.body.email;
    result.password = await bcrypt.hashSync(req.body.password, 10);
    result.start = {
      Shours: req.body.starthours,
      Smin: req.body.startmin,
      SSec: req.body.SSec,
    };
    result.endtime = {
      Ehours: req.body.endhours,
      Emin: req.body.endMin,
      Esec: req.body.Esec,
    };
    result.save();
    res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeleteInsteller = async (req, res) => {
  try {
    await installer.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Insteller is Deleted ",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.Address = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    result.location = {
      address: req.body.address,
      long: req.body.long,
      late: req.body.late,
      Radius: req.body.Radius,
    };
    result.save();
    res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.AddServices = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    result.servies = req.body.servies;
    result.save();
    res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getAllInstaller = async (req, res) => {
  try {
    const result = await installer.find();
    res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getByInstallerId = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
};
