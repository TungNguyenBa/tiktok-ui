import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
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
                        {renderItems()}
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

export default Menu;
