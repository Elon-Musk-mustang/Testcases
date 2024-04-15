// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CreateComponent } from './create.component';

// describe('CreateComponent', () => {
//   let component: CreateComponent;
//   let fixture: ComponentFixture<CreateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CreateComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(CreateComponent);
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
// import { CreateComponent } from './create.component';
// import { PostService } from '../post.service';
// import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// import { of } from 'rxjs';

// describe('CreateComponent', () => {
//   let component: CreateComponent;
//   let fixture: ComponentFixture<CreateComponent>;
//   let router: Router;
//   let postService: jasmine.SpyObj<PostService>;

//   beforeEach(() => {
//     const postServiceSpy = jasmine.createSpyObj('PostService', ['create']);
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, ReactiveFormsModule],
//       providers: [{ provide: PostService, useValue: postServiceSpy }]
//     }).compileComponents();

//     fixture = TestBed.createComponent(CreateComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
//   });

//   it('should navigate to post/index when clicking the back button', () => {
//     const navigateSpy = spyOn(router, 'navigateByUrl');
//     component.goBack();
//     expect(navigateSpy).toHaveBeenCalledWith('post/index');
//   });

//   it('should call postService.create and navigate to post/index on form submission', () => {
//     const routerSpy = spyOn(router, 'navigateByUrl');
  
//     // Initialize the form control or form group
//     component.form = new FormGroup({
//       title: new FormControl('Test Title', Validators.required),
//       body: new FormControl('Test Body', Validators.required)
//     });
  
//     // Mock the behavior of postService.create()
//     postService.create.and.returnValue(of({}));
  
//     // Trigger form submission
//     component.submit();
  
//     // Check if postService.create method is called
//     expect(postService.create).toHaveBeenCalled();
  
//     // Check if router.navigateByUrl method is called with the correct URL
//     expect(routerSpy).toHaveBeenCalledWith('post/index');
//   });
  
// });


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateComponent } from './create.component';
import { PostService } from '../post.service';
import { of } from 'rxjs';


describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let router: Router;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['create']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [{ provide: PostService, useValue: postServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should navigate to post/index when clicking the back button', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith('post/index');
  });

  it('should call postService.create and navigate to post/index on form submission', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
  
    // Initialize the form control or form group
    component.form = new FormGroup({
      title: new FormControl('Test Title', Validators.required),
      body: new FormControl('Test Body', Validators.required)
    });
  
    // Mock the behavior of postService.create()
    postService.create.and.returnValue(of({}));
  
    // Trigger form submission
    component.submit();
  
    // Check if postService.create method is called
    expect(postService.create).toHaveBeenCalled();
  
    // Check if router.navigateByUrl method is called with the correct URL
    expect(routerSpy).toHaveBeenCalledWith('post/index');
  });

  it('should disable submit button if title and body fields are empty', () => {
    // Initialize the form control or form group with empty values
    component.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });

    fixture.detectChanges(); // Trigger change detection

    // Get the submit button element
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    
    // Check if the submit button is disabled
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button if title and body fields are filled', () => {
    // Initialize the form control or form group
    component.form = new FormGroup({
      title: new FormControl('', Validators.required), // Initially empty
      body: new FormControl('', Validators.required)   // Initially empty
    });
  
    // Before filling the fields, the submit button should be disabled
    expect(component.form.valid).toBeFalse();
  
    // Fill the title and body fields
    const titleControl = component.form.get('title');
    const bodyControl = component.form.get('body');
    
    if (titleControl && bodyControl) {
      titleControl.setValue('Test Title');
      bodyControl.setValue('Test Body');
  
      // After filling the fields, the submit button should be enabled
      expect(component.form.valid).toBeTrue();
    } else {
      fail('Form controls are null');
    }
  });
  
});

