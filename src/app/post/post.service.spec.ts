// import { TestBed } from '@angular/core/testing';

// import { PostService } from './post.service';

// describe('PostService', () => {
//   let service: PostService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(PostService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

// import { TestBed, inject } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { PostService } from './post.service';
// import { Post } from './post';

// describe('PostService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [PostService]
//     });
//   });

//   it('should be created', inject([PostService], (service: PostService) => {
//     expect(service).toBeTruthy();
//   }));

//   describe('getAll', () => {
//     it('should return an Observable<any>', inject([PostService, HttpTestingController],
//       (service: PostService, httpMock: HttpTestingController) => {
//         const mockData = [
//           { id: 1, title: 'Mock Post 1' },
//           { id: 2, title: 'Mock Post 2' }
//         ];

//         service.getAll().subscribe((data: any) => {
//           expect(data.length).toBe(2);
//           expect(data).toEqual(mockData);
//         });

//         const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/');
//         expect(req.request.method).toBe('GET');
//         req.flush(mockData);

//         httpMock.verify();
//       }));
//   });

//   describe('create', () => {
//     it('should create a new post', inject([PostService, HttpTestingController],
//       (service: PostService, httpMock: HttpTestingController) => {
//         const mockPost: Post = {
//           id: 101,
//           title: 'Test Post',
//           body: 'This is a test post'
//         };

//         service.create(mockPost).subscribe((data: any) => {
//           expect(data).toEqual(mockPost);
//         });

//         const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/');
//         expect(req.request.method).toBe('POST');
//         expect(req.request.body).toEqual(JSON.stringify(mockPost));
//         req.flush(mockPost);

//         httpMock.verify();
//       }));
//   });

//   describe('find', () => {
//     it('should return the post with the specified id', inject([PostService, HttpTestingController],
//       (service: PostService, httpMock: HttpTestingController) => {
//         const postId = 1;
//         const mockPost = { id: postId, title: 'Test Post', body: 'This is a test post' };

//         service.find(postId).subscribe((data: any) => {
//           expect(data).toEqual(mockPost);
//         });

//         const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//         expect(req.request.method).toBe('GET');
//         req.flush(mockPost);

//         httpMock.verify();
//       }));
//   });

//   describe('update', () => {
//     it('should update the post with the specified id', inject([PostService, HttpTestingController],
//       (service: PostService, httpMock: HttpTestingController) => {
//         const postId = 1;
//         const updatedPost: Post = { id: postId, title: 'Updated Post', body: 'This is an updated post' };

//         service.update(postId, updatedPost).subscribe((data: any) => {
//           expect(data).toEqual(updatedPost);
//         });

//         const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//         expect(req.request.method).toBe('PUT');
//         expect(req.request.body).toEqual(JSON.stringify(updatedPost));
//         req.flush(updatedPost);

//         httpMock.verify();
//       }));
//   });

//   describe('delete', () => {
//     it('should delete the post with the specified id', inject([PostService, HttpTestingController],
//       (service: PostService, httpMock: HttpTestingController) => {
//         const postId = 1;

//         service.delete(postId).subscribe(() => {
//           // No need to expect any response, as delete method usually doesn't return a response body
//         });

//         const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//         expect(req.request.method).toBe('DELETE');
//         req.flush({}); // No need to pass any response body for delete request

//         httpMock.verify();
//       }));
//   });
// });


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostService } from './post.service';
import { Post } from './post';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all posts', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
      { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
    ];

    service.getAll().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should create a post', () => {
    const newPost: Post = { id: 3, title: 'New Title', body: 'New Body' };

    service.create(newPost).subscribe(post => {
      expect(post).toEqual(newPost);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/');
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should update a post', () => {
    const updatedPost: Post = { id: 1, title: 'Updated Title', body: 'Updated Body' };

    service.update(1, updatedPost).subscribe(post => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('should delete a post', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeTruthy(); // Assuming the service returns a truthy value upon successful deletion
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

