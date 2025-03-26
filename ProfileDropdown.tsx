// src/components/ProfileDropdown.tsx
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier, signOut } from 'firebase/auth';

const ProfileDropdown: React.FC<{ user: any; onSignOut: () => void }> = ({ user, onSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmResult, setConfirmResult] = useState<any>(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handlePhoneSignIn = async () => {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    setConfirmResult(confirmationResult);
  };

  const handleVerifyCode = async () => {
    if (confirmResult) {
      await confirmResult.confirm(verificationCode);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center">
        {user ? (
          <span>{user.displayName || user.phoneNumber}</span>
        ) : (
          <span>Profile</span>
        )}
      </button>
      {showDropdown && (
        <div className="absolute right-0 bg-white shadow-lg rounded-md mt-2">
          {user ? (
            <div className="p-4">
              <p>{user.displayName || user.phoneNumber}</p>
              <button onClick={onSignOut} className="text-red-600">Sign Out</button>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-lg font-semibold">Sign In</h3>
              <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign in with Google</button>
              <div id="recaptcha-container"></div>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 rounded-md w-full mt-2"
              />
              <button onClick={handlePhoneSignIn} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Send OTP</button>
              {confirmResult && (
                <>
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border p-2 rounded-md w-full mt-2"
                  />
                  <button onClick={handleVerifyCode} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Verify Code</button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;