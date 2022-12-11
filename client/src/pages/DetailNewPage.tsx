const DetailNewPage = () => {
  const contentHTML = `<h2>Hướng dẫn sử dụng Adobe Premiere cho người mới bắt đầu</h2>
  <br/>
  <p><img src="https://d1j8r0kxyu9tj8.cloudfront.net/images/1599788179jrwyJJaHZ7mz4sS.jpg" alt=""></p>
  <br/>
  <p><strong>1.</strong> <strong>Adobe Premiere là gì?</strong></p>
  <br/>
  <p>Adobe Premiere là một ứng dụng chỉnh sửa video được phát triển và phát hành bởi Adobe Systems, với các chức năng chính: dựng phim, cắt ghép, biên tập, tinh chỉnh, thêm hiệu ứng đơn giản cho clip. Ngoài ra, phần mềm này còn hỗ trợ nhiều định dạng video, cho phép người sử dụng có thể chia sẻ trên nhiều nền tảng, phương tiện truyền thông.</p>
  <br/>
  <p><strong>2.</strong> <strong>Làm quen với giao diện phần mềm?</strong></p>
  <br/>
  <p>Adobe Premiere được thiết kế với giao diện đơn giản, thân thiện với người sử dụng với cách bố trí các thanh công cụ gọn gàng, thông minh. Nhờ vậy mà hiệu xuất làm việc được cải thiện, tiết kiệm thời gian với hệ thống công cụ hỗ trợ tối ưu</p>
  <p>Giao diện làm việc của Premiere được thiết kế với 6 phần chính:</p>
  <br/>
  <p><img src="https://d1j8r0kxyu9tj8.cloudfront.net/images/1599788864jMY1zl9n26fHmYo.jpg" alt=""></p>
  <br/>
  <ul>
  <li>
  <p>Menu bar:</p>
  </li>
  <li>
  <p>Program bar: hiển thị sản phẩm sau quá trình dựng, phép xem lại video trực tiếp, hình ảnh, âm thanh, effect đã thao tác trong quá trình dựng.</p>
  </li>
  <li>
  <p>Soure pan: xem lại các file nguồn.</p>
  </li>
  <li>
  <p>Project and media: Cửa sổ dự án – Đây là nơi chứa tất cả các file nguồn đã import, các title tạo trong khi dựng, các hiệu ứng, kỹ xảo của chương trình</p>
  </li>
  <li>
  <p>Timeline: Đây là cửa sổ xuất hiện tiến độ làm việc của sequence, bao gồm các đường hình (Video tracks) và các đường tiếng (Audio tracks).</p>
  </li>
  <li>
  <p>Toolbar: Bao gồm các công cụ hỗ trợ: cắt ghép, di chuyển, chèn chữ,...</p>
  </li>
  </ul>
  <br/>
  <p><strong>3.</strong> <strong>Thao tác chính khi làm việc với Premiere</strong></p>
  <p>a. Tạo Project
  Để có thể bắt đầu chỉnh sửa hay biên tập video trong Premiere, bạn cần tạo ra projects mới để có thể quản lí các file gốc, clip sau khi hoàn thành, giúp chỉnh sửa nhanh chóng và dễ dàng khi cần thiết.</p>
  <p>Các bước thực hiện:</p>
  <p>Bước 1: Khởi động phần mềm, chọn new project, sau đó cửa sổ như phía dưới sẽ ngay lập tức hiện ra.</p>
  <p><img src="https://d1j8r0kxyu9tj8.cloudfront.net/images/1599788897wernPBuOOYe5kSE.jpg" alt=""></p>`
  return (
    <>
      <div className="renderHTML" style={{ padding: '16px 32px', display: 'flex', justifyContent: 'center' }}>
        <div
          className="doctor_specialty"
          dangerouslySetInnerHTML={contentHTML ? { __html: contentHTML } : undefined}
        ></div>
      </div>
    </>
  )
}

export default DetailNewPage
