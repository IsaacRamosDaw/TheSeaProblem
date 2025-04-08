import './button.module.scss'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
}
export const Button = ({ variant, children, ...props }: Props) => {
  return (
    <button {...props} className={`button ${variant && `button--${variant}`}`}>{children}</button>
  );
}
