# VINHOMES GLOBAL GATE HẠ LONG
## Digital art direction · Phiên bản điều chỉnh theo tinh thần LUMIÈRE Ocean Crest

**24/09/2026 · Tài liệu làm việc cho landing page và website dự án**  
**Trạng thái:** đề xuất thiết kế digital, không phải brand guideline chính thức của Vinhomes. Font và logo gốc do chủ dự án website cung cấp sẽ được dùng nguyên bản.

---

## 01 — Quyết định thiết kế

**Concept: “Từ chân trời vịnh đến một cách sống mới.”** Website đi theo nhịp của một tạp chí kiến trúc: mở bằng phối cảnh rộng, chuyển qua trang kem ấm với typography có khoảng thở, rồi kết thúc ở một chương xanh biển sâu với CTA rõ. Hình ảnh được trao nhiều diện tích hơn khối bán hàng.

Bản cũ đúng về nhận diện xanh ngọc nhưng còn giống một bộ quy tắc giao diện thông dụng: nền gần trắng, header/CTA teal, các section tương đối đều nhịp. Hai tài liệu LUMIÈRE gợi được cách tạo cảm giác chỉn chu hơn qua **nền kem, bố cục rộng, typographic contrast, viền mảnh, hình ảnh lớn, motion ngắn**. Áp dụng những nguyên lý đó cho Vin Hạ Long; **không sao chép màu olive, burgundy, chữ Optima hay logo LUMIÈRE**.

| Lấy cảm hứng từ LUMIÈRE | Chuyển hóa cho Vin Hạ Long | Cần tránh |
|---|---|---|
| Canvas kem ấm thay trắng gắt | Kem cát sáng, phối cùng sắc vịnh và bầu trời | Kem ngả vàng mạnh khiến ảnh biển bị bẩn màu |
| Section thưa, nhịp editorial | Ảnh panorama, một câu lớn, khoảng nghỉ rộng | Để mọi section đều là ảnh trái/chữ phải |
| Một accent rõ, CTA tiết chế | Xanh biển sâu cho nút; vàng nhạt chỉ làm viền/điểm sáng | Copy burgundy THE RISE hoặc hover đỏ mận |
| Ít card, đường mảnh | Số liệu mở trên nền kem/xanh; khung chỉ khi phải nhóm | Sao chép mọi card ưu đãi từ KV bán hàng |
| Chuyển động dịu | Fade, clip ảnh, dịch 12–20 px | Parallax làm sai phối cảnh và gây giật |
| Display typography | Font gốc bạn có, headline quy mô lớn | Dùng Optima/LUMIÈRE cho Vin Hạ Long |

**Phân loại bằng chứng:** `OBSERVED` = thấy trong tám KV Vin Hạ Long; `INSPIRED` = nguyên lý bố cục từ hai tài liệu LUMIÈRE; `PROPOSED` = thông số site mới. Các mã màu bên dưới **không phải** màu Vinhomes chính thức. Hai tài liệu LUMIÈRE cũng không thống nhất màu xanh chính (`#444F2D` và `#606E40`); tuyên bố “official” trong file màu thứ hai chưa được kiểm chứng bằng brandbook gốc ở lượt này.

**CONFIDENCE: HIGH** về khác biệt nhận diện; **MEDIUM** về hướng art direction; **LOW** về giá trị màu chính thức.

## 02 — Visual DNA cần giữ của Vin Hạ Long

| Yếu tố | Chứng cứ trong tám ảnh | Quy tắc web |
|---|---|---|
| Logo và lockup Global Gate Hạ Long | Xuất hiện xuyên suốt KV | Sử dụng asset gốc; đúng biến thể nền sáng/tối, không gõ lại |
| Vịnh, mặt nước và chân trời | Ba KV toàn cảnh; ảnh cảnh quan | Giữ đường chân trời và cảm giác mở; chọn crop cho mobile riêng |
| Xanh ngọc → xanh biển | Hầu hết nền trời/nước/KV | Là dải sắc chủ đạo; teal tối giúp định hướng và tương phản |
| Nắng ấm và điểm vàng | KV panorama, biệt thự, ưu đãi | Một nhấn nhỏ; không biến toàn trang thành vàng kim |
| Kiến trúc đi cùng cảnh quan | KV tổng thể, biệt thự, giáo dục | Ảnh đủ lớn để thấy hình khối và quan hệ với vịnh |
| Sans hoa + chữ viết tay chọn lọc | Headline trên nhiều KV | Font gốc cho UI; script chỉ nếu có file/artwork thật |
| Số lớn, khung viền nổi | KV tài chính/ưu đãi | Chỉ dùng như ngôn ngữ của section chính sách, có ngày hiệu lực |

**Không chuyển:** màu olive `#606E40`, burgundy `#4F242A`, nền blush THE RISE, gradient bạc, font Optima, hiệu ứng chuyển olive→burgundy. Chúng gắn với dự án/phân khu khác. **CONFIDENCE: HIGH.**

## 03 — Color direction: sea editorial

**Tỷ lệ mục tiêu trên trang nội dung (PROPOSED):** 55–60% kem/trắng ấm; 25–30% ảnh vịnh/kiến trúc; 10–15% xanh sâu; vàng champagne dưới 3%, chủ yếu ở nét nhấn. Đây là định hướng bố cục, không phải phép đo bắt buộc cho mọi viewport.

| Vai trò | Token / HEX đề xuất | Cách dùng | Trạng thái |
|---|---|---|---|
| Warm canvas | `--bg-warm: #F5F0E4` | Nền section nội dung, form tách khỏi ảnh | PROPOSED; cảm hứng LUMIÈRE |
| Light canvas | `--bg-light: #FAF8F2` | Nền phần chữ dài hoặc chuyển cảnh | PROPOSED |
| Sea deep | `--sea-deep: #075F64` | Nút, heading trên kem, chapter nền tối | PROPOSED; cùng họ màu KV |
| Sea ink | `--sea-ink: #0A4144` | Body, heading chính trên nền sáng | PROPOSED |
| Bay turquoise | `--bay-turquoise: #39B9BE` | Đường mảnh, mảng phụ, chi tiết hover | PROPOSED; gợi KV |
| Mist | `--bay-mist: #DDEDE9` | Nền xen rất nhẹ, infographic | PROPOSED |
| Champagne | `--champagne: #D6BC7B` | Kẻ dòng, số display trên xanh tối, chi tiết logo nếu được phép | PROPOSED; gợi ánh nắng KV |
| Muted text | `--text-muted: #526D6C` | Copy phụ trên kem | PROPOSED |
| Divider | `--line: #C9D8D3` | Đường chia, outline form | PROPOSED |

**Tương phản tham khảo:** trắng trên sea deep ~7.4:1; sea ink trên warm canvas ~10:1; muted trên warm canvas ~4.9:1. Vàng champagne trên sea deep ~4:1 nên dành cho chữ lớn/đồ họa, không dùng cho caption nhỏ. Overlay trên ảnh phải kiểm tra theo từng crop, không khóa một gradient mờ cho mọi banner. HEX là công thức UI đề xuất; ảnh PNG có grading không chứng minh swatch chính thức.

**Ba scene màu:** (1) `warm canvas + sea ink` cho nội dung; (2) `ảnh vịnh + chữ sáng/tối theo vùng ảnh` cho hero; (3) `sea deep + light canvas + champagne rất ít` cho một chương nhấn và footer. **CONFIDENCE: MEDIUM.**

## 04 — Typography và logo

Bạn đã có font và logo. **Chỉ dùng những asset đó cho nhận diện**, còn số cỡ chữ dưới đây là khung thử nghiệm. Không gán tên font từ ảnh raster và không lấy Optima vì xuất hiện trong file LUMIÈRE.

| Level | Desktop / mobile | Weight khởi điểm | Ứng dụng |
|---|---|---|---|
| Display hero | `clamp(42px, 5.3vw, 82px)` / 40–46px | Weight thật gần 400–500 | 2–3 dòng, một thông điệp |
| H2 editorial | 52–60 / 32–38px | Weight thật gần 400–500 | Section statement và chapter |
| H3 | 30–34 / 24–28px | Weight thật gần 500–600 | Tên nhóm nội dung |
| Eyebrow | 12–13 / 12px | 600 | Hoa, tracking .10–.16em |
| Body | 17–18 / 16px | 400 | Line-height 1.55–1.7, dòng 50–72 ký tự |
| Caption / legal | 12–13 / 12px | 400–500 | Chú thích hình, điều kiện |
| Stat | 64–88 / 48–60px | 400–500 | Chỉ số có nguồn |
| CTA | 14–15 / 14–15px | 500–600 | Nhãn ngắn, dễ quét |

**Chỉnh so với bản cũ:** display lớn hơn, khoảng trống xung quanh nhiều hơn, mỗi section một mức chữ nổi trội; không để H1–H4 cùng cảm giác như một bảng tài liệu. Logo gốc xuất hiện một lần trong header và một lần footer; kiểm tra clearspace từ asset/brandbook nếu có. Font script chỉ làm artwork ở một câu ngắn khi file gốc hỗ trợ tiếng Việt; không làm font giao diện.

**Cần kiểm tra bằng asset:** family/weight thực, dấu tiếng Việt, quyền nhúng web, logo sáng/tối và khoảng trống bảo vệ. **CONFIDENCE: MEDIUM** về hierarchy, **LOW** về font/clearspace cụ thể.

## 05 — Layout: ấn tượng bằng nhịp, không bằng hiệu ứng dày

**Grid PROPOSED:** container 1360 px; gutter ngoài 48–64 desktop, 24 tablet, 20 mobile; grid 12 cột desktop, 4 cột mobile. Section thường có 104–144 px khoảng trên/dưới desktop và 64–88 px mobile. Copy tối đa 640–700 px; hình ảnh có thể vượt container ra mép viewport.

**Năm nhịp nên có trong một trang:**

1. **Cinematic:** ảnh tràn màn hình, chỉ một câu, một CTA; ưu tiên cảnh vịnh/công trình.
2. **Quiet:** nền kem, một câu editorial rất lớn, 2–3 dòng giải thích.
3. **Immersive:** ảnh toàn chiều rộng không card; caption gọn ở mép dưới.
4. **Architectural:** split không đối xứng 7/5 hoặc 8/4; chữ ít hơn ảnh.
5. **Deep sea:** một chương xanh tối để đặt số liệu đã kiểm chứng hoặc CTA cuối.

Sau section nhiều hình phải có section ít hình để mắt nghỉ. Không lặp chuỗi `H2 + ba card + nút` trên cả trang. Số liệu, tiện ích và bản đồ không cần cùng một kiểu khung. **CONFIDENCE: MEDIUM.**

## 06 — Hệ section đề xuất cho landing page

| # | Section | Art direction | CTA/nội dung |
|---:|---|---|---|
| 01 | Hero vịnh | Ảnh 16:9 hoặc bản crop riêng, headline đặt trên vùng trời có contrast | Một CTA tới form; không rải nhiều claim |
| 02 | Statement | Nền kem, headline lớn, một đoạn giới thiệu | Không CTA nếu chưa có quyết định mới |
| 03 | Dấu ấn cảnh quan | Ảnh panorama full bleed, kẻ đường caption | Chú thích nguồn ảnh |
| 04 | Vị trí / kết nối | Bản đồ được xác minh, split 7/5 | Chỉ đưa thời gian/địa danh có nguồn |
| 05 | Quy hoạch tổng thể | Ảnh/masterplan lớn, hotspot gọn | Mobile có danh sách thay thế |
| 06 | Kiến trúc | Ảnh biệt thự/công trình lớn, copy một bên | Nhận diện sản phẩm đúng tài liệu |
| 07 | Trải nghiệm sống | Ảnh lifestyle và cảnh quan, nhịp bất đối xứng | Tối đa ba ý, không cần icon cho mỗi ý |
| 08 | Chỉ số | Một chương xanh biển sâu, số lớn, vạch mảnh | Chỉ số có tài liệu và ngày kiểm chứng |
| 09 | Bộ sưu tập hình | Gallery 1 ảnh lớn + thumbnails | Chú thích “minh họa” theo nguồn |
| 10 | Chính sách | Panel rõ điều kiện và thời hạn, tách khỏi art direction chung | CTA tư vấn, không biến thành toàn trang sales |
| 11 | Form liên hệ | Nền kem, trường ít, layout 5/7 với ảnh crop | Label rõ, consent và thông tin liên hệ |
| 12 | Footer | Xanh biển sâu, logo sáng nếu có bản gốc | Thông tin pháp lý và liên hệ xác thực |

Có thể bỏ section thiếu nội dung xác minh; các template không chứng minh đặc tính thực tế dự án. **CONFIDENCE: MEDIUM** về hệ bố cục, **LOW** về thứ tự nội dung cuối.

## 07 — Hero và lead form: ba quyết định tạo khác biệt

**Hero desktop (PROPOSED):** min-height `min(900px, 92svh)`; header trong suốt chỉ nếu logo/menu đọc rõ; headline rộng tối đa 700 px; copy tối đa 2 dòng; nút một màu sea deep. Cảnh vịnh/kiến trúc chiếm ưu thế. Nếu KV chỉ có vùng trời giữa, căn chữ ở vị trí phù hợp ảnh thay vì ép lệch trái. Overlay cục bộ sau chữ, không phủ teal đều lên cả ảnh.

**Hero mobile (PROPOSED):** dùng file crop dọc riêng, giữ công trình và đường chân trời; chữ đặt vùng trời trống hoặc ở khối kem phía dưới ảnh. Không nén headline xuống 28 px chỉ để nhét lên ảnh.

**Form (PROPOSED):** nền kem `#F5F0E4`, viền 1 px, không gradient kim loại; tối đa 3 trường cần thiết; nút cao 52 px; label có thật, có thông tin đồng ý và trạng thái gửi/lỗi. Trên desktop có thể đặt form trong một khối riêng bên dưới hero hoặc chồng lên **vùng ảnh trống** sau khi QA từng crop; mobile đặt thành section tiếp theo, không che công trình.

**CONFIDENCE: MEDIUM.**

## 08 — Components và motion

| Component | Thiết kế PROPOSED |
|---|---|
| Header | Cao 76–84 px, logo chuẩn, menu ngắn, một CTA; nền đổi từ trong sang kem khi cuộn nếu tương phản ổn |
| Primary CTA | Sea deep, chữ trắng, cao 50–52 px, radius 0–4 px, padding 24–30 px; hover tối hơn một bậc |
| Secondary CTA | Border sea deep 1 px, nền trong, cùng chiều cao |
| Image frame | Không bo hoặc bo tối đa 4 px; caption riêng |
| Number block | Không card; số lớn, nhãn, đường phân cách mảnh, nguồn |
| Policy card | Chỉ khi có nội dung cần nhóm; nền light canvas, viền mảnh; không glow |
| Form field | Cao ≥48 px, border rõ, focus ring, label cố định |
| Floating mobile CTA | Một nút, chừa safe area, không che disclaimer |

**Motion PROPOSED:** reveal chữ 500–650 ms, translateY 12–20 px; ảnh clip/fade 650–800 ms; hover 180–240 ms; easing `cubic-bezier(.22,1,.36,1)`. Parallax nếu có ≤16 px và phải tắt khi `prefers-reduced-motion`. Không chuyển động logo hoặc làm mất phối cảnh công trình. Ảnh tĩnh không chứng minh motion chính thức. **CONFIDENCE: LOW** với timing.

## 09 — Responsive và QA

| Viewport | Hành vi chính |
|---|---|
| ≥1440 | Container 1360; hero cinematic; ảnh có vùng thở; H1 tối đa ~82 px |
| 1280 | Gutter 48; H1 ~68 px; kiểm tra CTA không lấn logo |
| 1024 | Split 6/6 hoặc xếp dọc khi chữ dài; menu gọn |
| 768 | Gutter 24; menu sheet; ảnh ngang được crop lại |
| 390 | Gutter 20; H1 40–46; body 16; form một cột; CTA dễ chạm |

Duyệt tối thiểu ở các viewport trên, kể cả ảnh và disclaimer. Số liệu chính sách chuyển thành hàng dọc trên mobile, không hạ cỡ caption pháp lý quá nhỏ. **CONFIDENCE: MEDIUM** về hành vi; **LOW** về breakpoint cứng.

## 10 — Tokens cho developer

**Tất cả dưới đây là PROPOSED cho bản thử.** Chèn `@font-face` theo file font bạn có; tên family là placeholder, không tự thay bằng font LUMIÈRE. Logo được dùng dưới dạng asset, không phải font.

```css
:root {
  --bg-warm: #f5f0e4;
  --bg-light: #faf8f2;
  --surface: #ffffff;
  --sea-deep: #075f64;
  --sea-ink: #0a4144;
  --bay-turquoise: #39b9be;
  --bay-mist: #ddede9;
  --champagne: #d6bc7b;
  --text-muted: #526d6c;
  --line: #c9d8d3;

  --font-heading: "PROJECT_HEADING_FONT", sans-serif;
  --font-body: "PROJECT_BODY_FONT", sans-serif;
  --font-display: "PROJECT_DISPLAY_FONT", sans-serif;

  --container: 1360px;
  --gutter-desktop: 48px;
  --gutter-mobile: 20px;
  --space-section: clamp(64px, 8vw, 144px);
  --radius-ui: 4px;
  --ease-editorial: cubic-bezier(.22, 1, .36, 1);
  --duration-hover: 200ms;
  --duration-reveal: 600ms;
}
```

### Quy tắc để Codex dựng giao diện

1. Đọc guideline này cùng **logo và font gốc** trước khi code; dùng đúng file, weight và biến thể có thật.
2. Chụp/QA ít nhất hero desktop 1440 và mobile 390 trước khi lặp section.
3. Giữ logo, ảnh vịnh và công trình ở vị trí không bị text/form che.
4. Chỉ dùng một nút chính trong mỗi viewport; các link khác giảm cấp.
5. Chỉ đưa con số, chính sách và claim có tài liệu được duyệt; điều kiện hiển thị ngay cạnh nội dung liên quan.
6. Không dùng olive, burgundy, Optima, gradient bạc hoặc CSS từ tài liệu LUMIÈRE trong trang Vin Hạ Long.
7. Các token là khởi điểm để duyệt mẫu thị giác, không gắn nhãn “official brand colors”.

## 11 — Do / don't và chốt hướng

| Do | Don't |
|---|---|
| Dùng khoảng thở và ảnh để tạo ấn tượng | Phủ nhiều gradient/shine lên ảnh |
| Nền kem sáng kết hợp vịnh xanh | Chép bảng olive/burgundy của LUMIÈRE |
| Dùng font/logo Vin Hạ Long bạn có | Thay bằng Optima hay logo dựng lại |
| Phối một section xanh sâu để tạo nhịp | Để toàn site một nền teal hoặc kem phẳng |
| Bố cục có hero, statement, ảnh immersive, split, số liệu | Lặp một mẫu ba card từ đầu đến cuối |
| Nhấn vàng cực ít | Tô vàng toàn bộ nút, viền và heading |
| Kiểm tra độ đọc chữ trên từng ảnh | Áp overlay mặc định lên mọi phối cảnh |
| Có crop mobile riêng | Kéo giãn/cắt mất kiến trúc và chân trời |
| Tách ưu đãi khỏi ngôn ngữ site chính | Biến site thành KV khuyến mại kéo dài |

**Kết luận:** **Có, cần điều chỉnh.** Lấy cảm giác biên tập, khoảng thở và nền kem từ LUMIÈRE sẽ khiến landing page Vin Hạ Long có sức hút hơn. Cần giữ nhận diện vịnh xanh, logo, font và hình ảnh của Vin Hạ Long, đồng thời để bảng màu/claim chính thức do chủ đầu tư xác nhận nếu có. Bản này là **hướng art direction để dựng thử và duyệt**, không phải phép chuyển giao brand guideline giữa hai dự án.
