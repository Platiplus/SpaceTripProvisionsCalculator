import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { LogoComponent } from './components/logo/logo.component';
import { CardComponent } from './components/card/card.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent,
        LogoComponent,
        CardComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        HttpClientModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
