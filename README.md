# KUN 项目

## 项目介绍
这是一个基于 SSM (Spring + SpringMVC + MyBatis-Plus) 和 Vue3 的前后端分离项目。

## 技术栈
### 后端
- Spring Framework
- SpringMVC
- MyBatis-Plus
- MySQL
- Maven

### 前端
- Vue 3
- Vite
- Element Plus
- Axios
- Vue Router
- Pinia

## 项目结构
```
KUN/
├── src/                    # 后端源代码
│   ├── main/
│   │   ├── java/         # Java 源代码
│   │   ├── resources/    # 配置文件
│   │   └── webapp/       # Web 资源
│   └── test/             # 测试代码
├── frontend/              # 前端项目
│   ├── src/              # 前端源代码
│   ├── public/           # 静态资源
│   └── package.json      # 前端依赖配置
└── pom.xml               # Maven 配置文件
```

## 开发环境要求
- JDK 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.8+

## 快速开始

### 后端启动
1. 克隆项目
```bash
git clone https://github.com/wangmingjia123/KUN.git
```

2. 配置数据库
- 创建数据库
- 修改 `application.yml` 中的数据库配置

3. 启动项目
```bash
mvn spring-boot:run
```

### 前端启动
1. 进入前端目录
```bash
cd frontend
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

## 功能特性
- [ ] 用户认证与授权
- [ ] 数据管理
- [ ] 文件上传
- [ ] 日志管理
- [ ] 系统监控

## 贡献指南
1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证
本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式
- 项目维护者：[您的名字]
- 邮箱：[您的邮箱] 
