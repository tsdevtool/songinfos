# Ứng Dụng Tìm Thông Tin Bài Hát 

## Giới Thiệu

Ứng dụng "Tìm Thông Tin Bài Hát" là một ứng dụng sử dụng Java Socket để tìm kiếm thông tin bài hát và ca sĩ. Người dùng có thể tra cứu thông tin bài hát (dựa vào tên bài hát) và thông tin ca sĩ (dựa vào tên ca sĩ) qua giao thức mạng (client-server). Server sẽ nhận yêu cầu từ client, xử lý yêu cầu và trả kết quả về cho client. Dữ liệu giữa client và server được mã hóa để đảm bảo tính bảo mật.

## Chức Năng

### 1. Chức Năng Tra Cứu Thông Tin Bài Hát

- Người dùng có thể tra cứu thông tin bài hát thông qua tên bài hát (có thể là tiếng Việt với dấu hoặc không dấu, hoặc tiếng Anh).
- **Thông tin trả về:**
  - Lời bài hát
  - Tên nhạc sĩ
  - Liên kết tới các audio/video trên Youtube hoặc các trang nghe nhạc trực tuyến.
  
- **Trường hợp lỗi:**
  - Nếu tên bài hát không chính xác hoặc có lỗi đánh máy, hệ thống sẽ gợi ý bài hát gần đúng nhất.

### 2. Chức Năng Tra Cứu Thông Tin Ca Sĩ

- Người dùng có thể tra cứu thông tin ca sĩ Việt Nam dựa trên tên.
- **Thông tin trả về:**
  - Họ tên, ngày sinh, quê quán
  - Thông tin về sự nghiệp
  - Các bài hát, album nổi tiếng
  - Liên kết tới các audio/video trên Youtube hoặc các trang nghe nhạc trực tuyến.
  
- **Trường hợp lỗi:**
  - Nếu tên ca sĩ không chính xác hoặc không tìm thấy thông tin, hệ thống sẽ báo lỗi.

## Cách Thức Hoạt Động

Ứng dụng sử dụng mô hình client-server qua giao thức mạng với Java Sockets. Các client (ứng dụng người dùng) gửi yêu cầu tới server để tìm kiếm thông tin bài hát hoặc ca sĩ. Server sẽ xử lý yêu cầu, tìm kiếm thông tin từ các cơ sở dữ liệu bên ngoài (hoặc API) và trả kết quả về cho client. Dữ liệu giữa client và server được mã hóa để bảo mật.

### Mô Hình Client-Server

- **Server:**
  - Nhận dữ liệu từ client.
  - Tìm kiếm và xử lý yêu cầu.
  - Trả kết quả lại cho client.
  
- **Client:**
  - Gửi yêu cầu tới server.
  - Hiển thị kết quả nhận được từ server (bao gồm lời bài hát, thông tin ca sĩ, link audio/video).
  
### Mã Hóa Dữ Liệu

Dữ liệu giữa client và server được mã hóa trước khi truyền đi để đảm bảo tính bảo mật. Các phương thức mã hóa đơn giản như Base64 hoặc AES có thể được sử dụng.

## Hướng Dẫn Cài Đặt và Sử Dụng

### 1. Cài Đặt Server

1. **Cài đặt Java**: Đảm bảo rằng máy tính của bạn đã cài đặt Java Development Kit (JDK). Bạn có thể tải về từ [Oracle JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
   
2. **Chạy Server**:
   - Clone dự án về máy:
     ```bash
     https://github.com/tsdevtool/songinfos.git
     ```
   - Di chuyển vào thư mục dự án:
     ```bash
     cd server
     ```
   - Biên dịch và chạy server:
     ```bash
     javac Server.java
     java Server
     ```

### 2. Cài Đặt Client

1. **Cài Đặt Java**: Đảm bảo rằng máy tính của bạn đã cài đặt Java Development Kit (JDK).

2. **Chạy Client**:
   - Clone dự án về máy:
     ```bash
     songinfos
     ```
   - Di chuyển vào thư mục dự án:
     ```bash
     cd app
     ```
   - Biên dịch và chạy client:
     ```bash
     javac Client.java
     java Client
     ```

### 3. Sử Dụng Ứng Dụng

- Khi client được mở, bạn có thể nhập tên bài hát hoặc tên ca sĩ để bắt đầu tìm kiếm.
- Client sẽ hiển thị thông tin bài hát hoặc ca sĩ, bao gồm lời bài hát, thông tin nhạc sĩ/ca sĩ, và liên kết đến các video/audio từ các trang như Youtube.
- Nếu có lỗi hoặc tên bài hát/ca sĩ không chính xác, hệ thống sẽ gợi ý các lựa chọn gần đúng.

## Mã Nguồn

- **Server.java**: Chứa mã nguồn của server, xử lý yêu cầu và tìm kiếm thông tin.
- **Client.java**: Chứa mã nguồn của client, gửi yêu cầu và hiển thị kết quả.
  
## Các Công Nghệ Sử Dụng

- **Java Socket**: Sử dụng Java Sockets để tạo mô hình client-server.
- **Mã Hóa Dữ Liệu**: Sử dụng phương thức mã hóa (Base64/AES) để bảo mật dữ liệu.
- **API Web (Tùy Chọn)**: Sử dụng API bên ngoài (ví dụ: Wikipedia API, Youtube API) để lấy thông tin bài hát/ca sĩ.

## Lưu Ý

- Để chạy ứng dụng này, bạn cần đảm bảo kết nối mạng ổn định, vì dữ liệu liên quan đến bài hát và ca sĩ có thể được lấy từ các nguồn trực tuyến (như Wikipedia hoặc Youtube).
- Nếu muốn mở rộng ứng dụng, bạn có thể tích hợp thêm các API âm nhạc khác như Spotify, Apple Music.

## Liên Hệ

- Tác giả: Nguyễn Thanh Siêu
- Email: sieusml03@gmail.com
- GitHub: https://github.com/tsdevtool
