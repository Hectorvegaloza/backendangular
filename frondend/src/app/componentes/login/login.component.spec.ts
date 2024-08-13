import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { LoginService } from '../../service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credential } from '../../interfaces/credential';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'warning', 'info']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear', () => {
    expect(component).toBeTruthy();
  });

  describe('handleSubmit', () => {
    it('Debería mostrarse una advertencia si el formulario no es válido', () => {
      component.credentialsForm.setValue({ username: '', password: '' });
      component.handleSubmit();
      expect(mockToastrService.info).toHaveBeenCalledWith('Todos los campos son obligatorios');
    });

    it('Debe llamar a loginService.login con las credenciales correctas y navegar en caso de éxito.', () => {
      const credential: Credential = { username: 'admin@example.com', password: 'password123' };
      const response = { resultado: 'bien', datos: 'token' };
      
      mockLoginService.login.and.returnValue(of(response));
      component.credentialsForm.setValue(credential);
      component.handleSubmit();
      
      expect(mockLoginService.login).toHaveBeenCalledWith(credential);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/shop');
      expect(mockToastrService.success).toHaveBeenCalledWith('Bienvenido!', '', {
        positionClass: 'toast-top-center',
        timeOut: 2000,
        closeButton: true
      });
    });

    it('should navigate to book-form for admin credentials', () => {
      const credential: Credential = { username: 'administrador@gmail.com', password: 'Clave123@' };
      const response = { resultado: 'bien', datos: 'token' };
      
      mockLoginService.login.and.returnValue(of(response));
      component.credentialsForm.setValue(credential);
      component.handleSubmit();
      
      expect(mockLoginService.login).toHaveBeenCalledWith(credential);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/book-form');
    });

    it('should show warning if login fails', () => {
      const credential: Credential = { username: 'user@example.com', password: 'wrongpassword' };
      const response = { resultado: 'mal', datos: '' };
      
      mockLoginService.login.and.returnValue(of(response));
      component.credentialsForm.setValue(credential);
      component.handleSubmit();
      
      expect(mockToastrService.warning).toHaveBeenCalledWith('Datos erroneos!', 'Revisa tus credenciales', {
        positionClass: 'toast-top-center',
        timeOut: 2000,
        closeButton: true
      });
    });
  });

  describe('ngOnInit', () => {
    it('Debería eliminar FINAL del almacenamiento local', () => {
      spyOn(localStorage, 'removeItem');
      component.ngOnInit();
      expect(localStorage.removeItem).toHaveBeenCalledWith('FINAL');
    });
  });
});