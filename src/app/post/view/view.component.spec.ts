// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ViewComponent } from './view.component';

// describe('ViewComponent', () => {
//   let component: ViewComponent;
//   let fixture: ComponentFixture<ViewComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ViewComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ViewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { of } from 'rxjs';
import { Post } from '../post';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let router: Router;
  let postService: jasmine.SpyObj<PostService>;
  const mockPost: Post = { id: 1, title: 'Test Title', body: 'Test Body' };

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['find']);
    TestBed.configureTestingModule({
      imports: [], // Remove ViewComponent from declarations and add it to imports if necessary
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { postId: 1 } } } },
        { provide: Router, useClass: Router } // This might need to be updated based on your router configuration
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should display correct id, title, and body', () => {
    postService.find.and.returnValue(of(mockPost));
    fixture.detectChanges();
    expect(component.id).toBe(1);
    expect(component.post).toEqual(mockPost);

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.post-id').textContent.trim()).toBe('1');
    expect(compiled.querySelector('.post-title').textContent.trim()).toBe('Test Title');
    expect(compiled.querySelector('.post-body').textContent.trim()).toBe('Test Body');
});


  it('should navigate to post/index when clicking the back button', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith('post/index');
  });
});
