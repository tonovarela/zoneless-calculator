import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";


describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        compiled = fixture.nativeElement
    });

    it('should create the app', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });


    it('should be 2', () => {
        const num1 = 1;
        const num2 = 2;
        const result = num1 + num2;
        expect(result).toBe(3);
    });


    it('should be title', () => {
        const app = fixture.componentInstance;
        expect(app.title).toEqual('calculator');
    });

    it('should render router-outlet', () => {
        expect(compiled.querySelector('router-outlet')).not.toBeNull();
    });


    it('should render router-outlet wraped with css clases', () => {
        const divElement = compiled.querySelector('div');
        const mustHaveClasses = "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(' ');
        expect(divElement).not.toBeNull();                
        const divClasses = divElement?.classList.value.split(' ');
         mustHaveClasses.forEach((className: string) => expect(divClasses).toContain(className));
    });


    it('should render link external', () => {
        const linkElement = compiled.querySelector('a');
        expect(linkElement).not.toBeNull();
        expect(linkElement?.getAttribute('title')).toEqual('Varela');
        expect(linkElement?.getAttribute('href')).toEqual('https://fonts.google.com/specimen/Varela');
        expect(linkElement?.textContent).toEqual('Varela');
    });
    

});


