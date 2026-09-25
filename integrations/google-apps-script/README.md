# Nhận đăng ký qua email bằng Google Apps Script

## Triển khai

1. Mở https://script.google.com/ và tạo **New project / Dự án mới**.
2. Dán toàn bộ `Code.gs` trong thư mục này vào file `Code.gs` của dự án.
3. Lưu; chọn hàm `authorizeMail`, bấm **Run / Chạy**, cấp quyền gửi email. Hàm này không gửi email thử.
4. Chọn **Deploy → New deployment → Web app**.
5. **Execute as / Thực thi dưới tư cách:** Me (tài khoản của bạn).
6. **Who has access / Ai có quyền truy cập:** Anyone (Bất kỳ ai). Nếu tài khoản tổ chức không cho phép, cần tài khoản/quyền phù hợp.
7. Bấm **Deploy**, sao chép **Web app URL** kết thúc bằng `/exec`.
8. Hai form hiện đã được kết nối trực tiếp tới URL `/exec` do chủ website cung cấp, qua hằng `LEAD_ENDPOINT` trong `script.js`. Cần triển khai bản website mới và xác minh endpoint hoạt động công khai trước khi nhận khách thật.

Nếu sửa Code.gs sau đó: **Deploy → Manage deployments → Edit → New version → Deploy**, giữ URL `/exec` hiện có.

## Người nhận cố định

- danghuylong14@gmail.com
- luongsonhungqn@gmail.com

Mail được gửi từ tài khoản triển khai Apps Script đến cả hai người nhận. Script không gửi tài liệu tự động qua Zalo; nhân viên nhận mail để liên hệ khách.

## Dữ liệu POST

Bắt buộc: `name`, `phone`, `consent` (`true`, `on` hoặc `1`).

Tùy chọn:

- `product`: loại sản phẩm popup.
- `interest`: loại sản phẩm form trên trang, dùng khi không có `product`.
- `financing`: phương án tài chính.
- `cta`: tiêu đề CTA khách bấm, lấy từ `form.dataset.cta` của popup.
- `formSource`: `popup` hoặc `landing-page`.
- `requestId`: UUID tạo một lần cho mỗi đăng ký, giữ nguyên khi gửi lại. Cache chống trùng trong 10 phút theo cơ chế best-effort, không phải lưu trữ lâu dài.
- `website`: honeypot nếu có, để trống. Đây chỉ là lọc bot đơn giản.

Nhận `application/x-www-form-urlencoded` (URLSearchParams/FormData) hoặc JSON. Không gửi thông tin khách qua query string/GET. Không lấy email người nhận từ trình duyệt.

Phản hồi JSON: `{ "ok": true }` khi MailApp chấp nhận yêu cầu gửi, hoặc `{ "ok": false, "code": "..." }`. Đây không phải xác nhận thư đã vào Inbox; cần kiểm tra Spam nếu chưa thấy thư.

## Kết nối website

Website hiện dùng POST URLSearchParams với CORS, không gửi cookie, theo redirect của Google và chỉ hiển thị thành công khi đọc được JSON `ok === true`. Nút gửi được khóa trong khi chờ; timeout 30 giây; lỗi mạng/JSON/quota giữ lại dữ liệu để thử lại. Nếu môi trường triển khai chặn CORS, cần endpoint cùng tên miền trong Cloudflare Worker/Pages Function để chuyển tiếp và đọc JSON; không chuyển sang no-cors để báo thành công giả.

Không dùng `fetch(..., {mode: 'no-cors'})` rồi coi Promise hoàn tất là thành công: phản hồi opaque không cho biết Apps Script đã gửi mail hay chưa. Việc cấu hình endpoint Cloudflare phụ thuộc dự án đang dùng Workers hay Pages.

Google áp dụng hạn mức MailApp theo tài khoản; mỗi đăng ký dùng 2 người nhận. Script kiểm tra hạn mức trước khi gửi và trả lỗi nếu không đủ. Chưa có lưu dự phòng vào Google Sheets. Endpoint public có thể bị spam; nếu chạy quảng cáo quy mô lớn, nên bổ sung Turnstile và giới hạn tần suất tại Cloudflare.

## Tài liệu chính thức

- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/reference/mail/mail-app
