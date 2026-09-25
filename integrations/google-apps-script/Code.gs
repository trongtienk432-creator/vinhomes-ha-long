/**
 * MICC — Vinhomes Global Gate Hạ Long.
 * Deploy as Web app, Execute as: Me, Who has access: Anyone.
 * Accepts POST application/x-www-form-urlencoded or JSON.
 */
const LEAD_RECIPIENTS = [
  'danghuylong14@gmail.com',
  'luongsonhungqn@gmail.com'
];

function doGet() {
  return jsonResponse_({ ok: true, service: 'MICC lead notifications' });
}

function doPost(e) {
  let lock;
  try {
    const content = e && e.postData;
    if (!content || !content.contents || content.contents.length > 12000) {
      return jsonResponse_({ ok: false, code: 'INVALID_REQUEST' });
    }
    let data;
    try {
      data = /application\/json/i.test(content.type || '')
        ? JSON.parse(content.contents)
        : e.parameter;
    } catch (_) {
      return jsonResponse_({ ok: false, code: 'INVALID_REQUEST' });
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return jsonResponse_({ ok: false, code: 'INVALID_REQUEST' });
    }
    // Optional honeypot; the legitimate form leaves this empty.
    if (data.website) return jsonResponse_({ ok: false, code: 'INVALID_REQUEST' });

    const name = text_(data.name, 100);
    const phone = text_(data.phone, 20);
    const digits = phone.replace(/\D/g, '');
    if (name.length < 2 || !/^[+0-9 ()-]+$/.test(phone) || digits.length < 9 || digits.length > 15) {
      return jsonResponse_({ ok: false, code: 'INVALID_CONTACT', message: 'Vui lòng kiểm tra họ tên và số điện thoại.' });
    }
    if (![true, 'true', 'on', '1', 1].includes(data.consent)) {
      return jsonResponse_({ ok: false, code: 'CONSENT_REQUIRED', message: 'Vui lòng xác nhận đồng ý liên hệ tư vấn.' });
    }

    const requestId = text_(data.requestId, 80);
    if (requestId && !/^[a-zA-Z0-9_-]{16,80}$/.test(requestId)) {
      return jsonResponse_({ ok: false, code: 'INVALID_REQUEST_ID' });
    }
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return jsonResponse_({ ok: false, code: 'BUSY' });
    // Reuse requestId when retrying the same submission. Cache is best-effort.
    const cache = CacheService.getScriptCache();
    const cacheKey = requestId ? 'lead:' + requestId : '';
    if (cacheKey && cache.get(cacheKey)) {
      return jsonResponse_({ ok: true, duplicate: true });
    }
    if (MailApp.getRemainingDailyQuota() < LEAD_RECIPIENTS.length) {
      return jsonResponse_({ ok: false, code: 'MAIL_QUOTA', message: 'Chưa gửi được đăng ký. Vui lòng liên hệ hotline.' });
    }

    const timestamp = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const body = [
      'KHÁCH HÀNG ĐĂNG KÝ — VINHOMES GLOBAL GATE HẠ LONG',
      '',
      'Thời gian (Việt Nam): ' + timestamp,
      'Họ và tên: ' + name,
      'Điện thoại/Zalo: ' + phone,
      'Sản phẩm quan tâm: ' + (text_(data.product || data.interest, 160) || 'Chưa chọn'),
      'Phương án tài chính: ' + (text_(data.financing, 200) || 'Chưa chọn'),
      'CTA khách đã chọn: ' + (text_(data.cta, 240) || 'Đăng ký tư vấn'),
      'Vị trí form: ' + (text_(data.formSource, 80) || 'Landing page'),
      'Đồng ý MICC liên hệ qua điện thoại/Zalo: Có',
      'Chính sách: https://chungcumasterioceancity.com/chinh-sach-bao-mat.html',
      '',
      'Thông báo đăng ký từ website. Vui lòng liên hệ khách hàng để tư vấn.'
    ].join('\n');

    MailApp.sendEmail({
      to: LEAD_RECIPIENTS.join(','),
      subject: '[MICC Hạ Long] Khách đăng ký: ' + name + ' — ' + phone,
      body: body,
      name: 'MICC | Vinhomes Hạ Long'
    });
    if (cacheKey) cache.put(cacheKey, 'sent', 600);
    return jsonResponse_({ ok: true, message: 'MICC đã nhận đăng ký của Anh/Chị.' });
  } catch (_) {
    // Do not expose contact data or internal errors to the public endpoint.
    console.error('Lead email processing failed.');
    return jsonResponse_({ ok: false, code: 'SEND_FAILED', message: 'Chưa xác nhận được đăng ký. Vui lòng liên hệ hotline.' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

// Run once in the editor to grant MailApp permission; does not send mail.
function authorizeMail() {
  console.log('Số người nhận còn lại trong hạn mức hôm nay: ' + MailApp.getRemainingDailyQuota());
}

function text_(value, limit) {
  return String(value == null ? '' : value).replace(/[\r\n\t]+/g, ' ').trim().slice(0, limit);
}

function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
