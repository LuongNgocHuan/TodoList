import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePinCodeValidation() {
  const navigate = useNavigate();
  const pinCode = localStorage.getItem('code');

  useEffect(() => {
    if (!pinCode || pinCode.length <= 0) {
      navigate('/set-code');
    }
  }, [navigate, pinCode]);

  return pinCode;
}
