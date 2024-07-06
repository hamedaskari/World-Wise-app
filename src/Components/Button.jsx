import styles from "./Button.module.css";

function Button({ children, onClick, type, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
