import * as httpRequest from '~/utils/httpRequest';

// Xuất hàm, nhận tham số 'q' và kiểu tìm kiếm 'less'
export const search = async (q, type = 'less') => {
    try {
        // Thực hiện yêu cầu GET đến đường dẫn 'user/serch'
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
