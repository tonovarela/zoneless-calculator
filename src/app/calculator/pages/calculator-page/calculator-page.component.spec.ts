import { ComponentFixture, TestBed } from "@angular/core/testing";
import CalculatorPageComponent from "./calculator-page.component";



describe('CalculatorPageComponent', () => {
    let fixture: ComponentFixture<CalculatorPageComponent>;
    let compiled: HTMLElement;
    let component:CalculatorPageComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorPageComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CalculatorPageComponent);
        compiled = fixture.nativeElement
        component = fixture.componentInstance;
        
    });

    it('should create the component', () => {                
        expect(component).toBeTruthy();
    });

    it('should contain calculator component', () => {
        expect(compiled.querySelector('calculator')).not.toBeNull();
    });
    it('should contain basic css classes', () => {
        const divElement = compiled.querySelector('div');
        const shouldHaveClasses = "w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden".split(' ');
        expect(divElement).not.toBeNull();
        const divClasses = divElement?.classList.value.split(' ');        
        shouldHaveClasses.forEach((className: string) => expect(divClasses).toContain(className));


        
    });
    

});

