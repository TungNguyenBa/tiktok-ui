import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValued] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValued(value), delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}

export default useDebounce;

// hook này sử dụng để trì hoạn việc xử lý giá trị đầu vào.
// Ví dụ khi tìm kiếm trong 1 ô nhập mà không muốn gửi yêu cầu khi mỗi lần người nhập 1 kí tự mới mà muốn sau khi người đó dừng nhập 1 khoảng thời gian
