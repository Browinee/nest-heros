export interface UpdatePassword {
  username: string;
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}

export function UpdatePassword() {
  return <div>UpdatePassword</div>;
}
