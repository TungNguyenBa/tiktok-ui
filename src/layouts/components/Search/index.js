import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import useDebounce from '~/hooks/useDebounce';
import * as searchService from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState(''); // Giá trị ô input
    const [searchResult, setSearchResult] = useState([]); // Search từ khóa
    const [showResult, setShowResult] = useState(true); // Show kết quả tìm kiếm
    const [loading, setLoading] = useState(false); // Show icon loading

    const debounced = useDebounce(searchValue, 600); // decounce sẽ giữ giá trị hiện tại 600

    const inputRef = useRef();

    useEffect(() => {
        // Khi giá trị của searchValue thay đổi
        if (!debounced.trim()) {
            // Nếu searchValue là chuỗi trắng hoặc chỉ chứa khoảng trắng, đặt setSearchResult([]) và kết thúc useEffect
            setSearchResult([]);
            return;
        }
        // Hàm sẽ được gọi khi debounced thay đổi
        const fetchApi = async () => {
            setLoading(true); // Set trạng thái loading true để hiện animations
            const result = await searchService.search(debounced); // Gọi hàm tìm kiếm dịch vụ với giá trị đã trì hoãn
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    // Hàm này để fix các case khi serch. Không bắt đầu khoảng trắng thì ms nhập đc
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div
                        className={cx('search-result')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult} // Khi click ra bên ngoài thì ẩn kết quả tìm kiếm onHile() thì ứng dụng menu thôi
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)} // Khi click lại vào thì lại hiện lên hơ hơ
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}

                    <button
                        className={cx('search-btn')}
                        onMouseDown={(e) => e.preventDefault()} // Ngăn chặn các hành động được setup cho việc nhấn chuột. Trong TH này là loại bpr việc viền khung nhập đen lên khi ta cấu hình
                    >
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
