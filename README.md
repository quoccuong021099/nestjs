## 1) Main.ts bao gồm một hàm không đồng bộ, sẽ khởi động ứng dụng của chúng tôi

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

## 2) Controllers

- Để tạo Controllers bằng CLI, chỉ cần thực hiện lệnh `$ nest g controller cat`.

- Để nhanh chóng tạo Controllers CRUD với validation được tích hợp sẵn, bạn có thể sử dụng trình tạo CRUD của CLI: `nest g resource [name]`.

#### Status code

- Mã trạng thái phản hồi luôn là 200 theo mặc định, ngoại trừ các yêu cầu POST là 201. Chúng tôi có thể dễ dàng thay đổi hành vi này bằng cách thêm trình trang trí `@HttpCode (...)` ở cấp trình xử lý.

```ts
import HttpCode from the @nestjs/common
  @Post()
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }
```

#### Headers

- Để chỉ định tiêu đề phản hồi tùy chỉnh, bạn có thể sử dụng trình trang trí `@Header()` hoặc đối tượng phản hồi dành riêng cho thư viện (và gọi trực tiếp `res.header()`).

```ts
import Header from the @nestjs/common
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

### Redirection

- Để chuyển hướng phản hồi đến một URL cụ thể, bạn có thể sử dụng trình trang trí `@Redirect()` hoặc đối tượng phản hồi dành riêng cho thư viện (và gọi trực tiếp `res.redirect()`).

- `@Redirect()` takes two arguments, url and statusCode, both are optional. The default value of statusCode is 302 (Found) if omitted.

```ts
  @Get()
  @Redirect('https://nestjs.com', 301)
```

- Đôi khi bạn có thể muốn xác định mã trạng thái HTTP hoặc URL chuyển hướng động. Thực hiện việc này bằng cách trả về một đối tượng từ phương thức trình xử lý định tuyến có hình dạng:

```ts
  {
  "url": string,
  "statusCode": number
  }
```

- Các giá trị trả về sẽ ghi đè bất kỳ đối số nào được chuyển đến trình trang trí @Redirect (). Ví dụ:

```ts
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
```

### Route Param

```ts
 import Param from the @nestjs/common
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
```
