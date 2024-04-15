// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { IndexComponent } from './index.component';

// describe('IndexComponent', () => {
//   let component: IndexComponent;
//   let fixture: ComponentFixture<IndexComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [IndexComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(IndexComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { IndexComponent } from './index.component';
// import { CreateComponent } from '../create/create.component';
// import { EditComponent } from '../edit/edit.component';
// import { ViewComponent } from '../view/view.component';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { PostService } from '../post.service';
// import { of } from 'rxjs';
// import { Post } from '../post';

// describe('App Routing', () => {
//   let router: Router;
//   let location: Location;
//   let fixture: ComponentFixture<any>;
//   let postService: jasmine.SpyObj<PostService>;
//   const mockPosts: Post[] = [
//     { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
//     { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
//   ];

//   beforeEach(() => {
//     const postServiceSpy = jasmine.createSpyObj('PostService', ['getAll', 'delete']);
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule.withRoutes(routes), CommonModule, RouterModule],
//       declarations: [IndexComponent, ViewComponent, CreateComponent, EditComponent],
//       providers: [{ provide: PostService, useValue: postServiceSpy }]
//     });

//     router = TestBed.inject(Router);
//     location = TestBed.inject(Location);
//     fixture = TestBed.createComponent(IndexComponent);
//     postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
//     router.initialNavigation();
//   });

//   it('should navigate to "/post/index" when navigating to "/post"', () => {
//     router.navigate(['/post']).then(() => {
//       expect(location.path()).toBe('/post/index');
//     });
//   });

//   it('should navigate to "/post/create" when navigating to "/post/create"', () => {
//     router.navigate(['/post/create']).then(() => {
//       expect(location.path()).toBe('/post/create');
//     });
//   });

//   it('should navigate to "/post/:postId/view" when navigating to "/post/:postId/view"', () => {
//     const postId = 123; // Replace with a valid post ID
//     router.navigate([`/post/${postId}/view`]).then(() => {
//       expect(location.path()).toBe(`/post/${postId}/view`);
//     });
//   });

//   it('should navigate to "/post/:postId/edit" when navigating to "/post/:postId/edit"', () => {
//     const postId = 123; // Replace with a valid post ID
//     router.navigate([`/post/${postId}/edit`]).then(() => {
//       expect(location.path()).toBe(`/post/${postId}/edit`);
//     });
//   });

//   it('should fetch all posts on initialization', () => {
//     postService.getAll.and.returnValue(of(mockPosts));
//     fixture.detectChanges();
//     expect(component.posts).toEqual(mockPosts);
//   });

//   it('should delete post when delete button is clicked', () => {
//     postService.delete.and.returnValue(of(null));
//     const postIdToDelete = 1;
//     const remainingPosts = mockPosts.filter(post => post.id !== postIdToDelete);
//     component.posts = mockPosts;
//     fixture.detectChanges();
//     component.deletePost(postIdToDelete);
//     expect(component.posts).toEqual(remainingPosts);
//   });

//   it('should navigate to view post when view button is clicked', () => {
//     const postId = 1; // Replace with a valid post ID
//     const viewButton = fixture.nativeElement.querySelector(`[routerLink="/post/${postId}/view"]`);
//     viewButton.click();
//     fixture.whenStable().then(() => {
//       expect(location.path()).toBe(`/post/${postId}/view`);
//     });
//   });

//   it('should navigate to edit post when edit button is clicked', () => {
//     const postId = 1; // Replace with a valid post ID
//     const editButton = fixture.nativeElement.querySelector(`[routerLink="/post/${postId}/edit"]`);
//     editButton.click();
//     fixture.whenStable().then(() => {
//       expect(location.path()).toBe(`/post/${postId}/edit`);
//     });
//   });

//   it('should create new post', () => {
//     // Prepare a new post data
//     const newPost: Post = { id: 3, title: 'New Post', body: 'New Post Body' };
  
//     // Spy on the postService.create method
//     spyOn(postService, 'create').and.returnValue(of(newPost));
  
//     // Trigger the creation process (this could involve submitting a form or any other method)
//     // For demonstration purposes, let's assume there's a method in IndexComponent to handle post creation
//     component.createPost();
  
//     // Simulate asynchronous behavior
//     fixture.detectChanges();
  
//     // Verify that the postService.create method was called with the correct data
//     expect(postService.create).toHaveBeenCalledWith(newPost);
  
//     // Verify that the new post is added to the list of posts
//     expect(component.posts).toContain(newPost);
//   });
  
// });


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexComponent } from './index.component';
import { PostService } from '../post.service';
import { of,throwError } from 'rxjs';
import { Post } from '../post';
import { Router } from '@angular/router';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: Router;
  let location: Location;
  const mockPosts: Post[] = [
    { id: 1, title: 'Test Title 1', body: 'Test Body 1' },
    { id: 2, title: 'Test Title 2', body: 'Test Body 2' }
  ];

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getAll', 'delete']);
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        Location // Add Location to the providers
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router); // Inject Router
    location = TestBed.inject(Location); // Inject Location
  });

  it('should fetch all posts on initialization', () => {
    postService.getAll.and.returnValue(of(mockPosts));
    fixture.detectChanges();
    expect(component.posts).toEqual(mockPosts);
  });

 
it('should navigate to "/post/create" when user clicks on Create New Post button', () => {
    router.navigate(['/post/create']).then(() => {
        expect(location.path()).toBe('/post/create');
    });
});

it('should navigate to "/post/:postId/view" when user clicks on View button', () => {
    const postId = 10; 
    router.navigate([`/post/${postId}/view`]).then(() => {
        expect(location.path()).toBe(`/post/${postId}/view`);
    });
});

it('should navigate to "/post/:postId/edit" when user clicks on Edit button', () => {
    const postId = 11; 
    router.navigate([`/post/${postId}/edit`]).then(() => {
        expect(location.path()).toBe(`/post/${postId}/edit`);
    });
});

  

it('should delete post when delete button is clicked', () => {
  const postIdToDelete = 1;
  const remainingPosts = mockPosts.filter(post => post.id !== postIdToDelete);
  component.posts = mockPosts;

  // Mock the delete method of the PostService
  postService.delete.withArgs(postIdToDelete).and.returnValue(of({}));

  // Call the deletePost method
  component.deletePost(postIdToDelete);

  // Expect that the delete method of the PostService is called with the correct ID
  expect(postService.delete).toHaveBeenCalledWith(postIdToDelete);

  // Expect that the posts array is updated after deletion
  expect(component.posts).toEqual(remainingPosts);
});


  
});
