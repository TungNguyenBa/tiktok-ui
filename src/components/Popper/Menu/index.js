import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]} // Điều chỉnh vị trí của Tipy svs mục gốc
            hideOnClick={hideOnClick} // Mặc định của Tippy hàm này là true nên khi ta nhấn chuột vào thì tippy sẽ ẩn đi. Mà ta thì muốn là khi dê chuột ra vùng khác thì ms ẩn
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    );
                                }}
                                // Khi 1 mục menu con (có children) được chọn -> sẽ thêm vào history sẽ bao gồm tất cả các mục menu con đã được chọn tại thời điểm đó. Khi hàm onBack được gọi sẽ thực hiện cập nhật 'history' bằng cách loại bỏ đi phần tử cuối mảng -> Quay lại trạng thái trước đó trong lịch sử menu
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
            // Khi menu đóng lại thì cập nhật lại trạng thái ban đầu của menu để khi hover lại vào thì hiện trạng thái ban đầu
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
