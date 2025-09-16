# File Upload API

## Upload Image to Project

**Endpoint:** POST /api/projects/:id/images

**Content-Type:** multipart/form-data

**Parameters:**
- `image` (file, required): Image file to upload
- `alt` (string, optional): Alt text for the image
- `caption` (string, optional): Caption for the image

**Supported file types:** jpeg, jpg, png, gif, webp
**Max file size:** 10MB

**Example using curl:**
```bash
curl -X POST http://localhost:3000/api/projects/1/images \
  -F "image=@/path/to/your/image.jpg" \
  -F "alt=Project image" \
  -F "caption=This is a project image"
```

**Response:**
```json
{
  "id": 1,
  "src": "/uploads/images/uuid-filename.jpg",
  "alt": "Project image",
  "caption": "This is a project image",
  "projectId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Note:** Uploaded images are accessible via the URL: http://localhost:3000/uploads/images/filename
