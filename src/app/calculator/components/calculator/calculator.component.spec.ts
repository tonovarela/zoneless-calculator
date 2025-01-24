import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorComponent } from "./calculator.component";

describe(`CalculatorComponent`, () => {
       let fixture: ComponentFixture<CalculatorComponent>;
        let compiled: HTMLElement;
        let component: CalculatorComponent;
   beforeEach(async () => {
           await TestBed.configureTestingModule({
               imports: [CalculatorComponent]
           }).compileComponents();
           fixture = TestBed.createComponent(CalculatorComponent);
           compiled = fixture.nativeElement
           component = fixture.componentInstance;
           fixture.detectChanges();
       });

       it('should create the component', () => {        
        expect(component).toBeTruthy();
    });




});



