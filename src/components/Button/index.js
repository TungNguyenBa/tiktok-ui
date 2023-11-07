import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps, //Link ngoại nhưng mở new tab
    };

    if (to) {
        props.to = to; // Link nội bộ
        Comp = Link;
    } else if (href) {
        props.href = href; // Link ngoại
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
    });
    return (
        <Comp classNames={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
