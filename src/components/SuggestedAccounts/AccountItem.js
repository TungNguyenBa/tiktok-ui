import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview/AccountPreview';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-20, 0]}
                placement="bottom"
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/46b6e2b1b855e3b700dfa16198a067fd~c5_100x100.jpeg?x-expires=1699513200&x-signature=CnVbRmPp6RYAL1WorPvIyb70FUo%3D"
                        alt="Tungg"
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>nguyenbatung</strong>
                            <FontAwesomeIcon
                                className={cx('check')}
                                icon={faCheckCircle}
                            />
                        </p>
                        <p className={cx('name')}>Nguyễn Bá Tùng</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {};

export default AccountItem;
