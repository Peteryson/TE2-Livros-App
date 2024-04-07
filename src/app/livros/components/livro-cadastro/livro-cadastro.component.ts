import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, NgControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AutorInterface } from "@autor";
import { AlertService } from "@services";
import { format } from "date-fns-tz";
import { Subscription, min } from "rxjs";
import { AutorService } from "src/app/autores/services/autor.service";

@Component({
    templateUrl: './livro-cadastro.component.html'
})
export class LivroCadastroComponent implements OnInit{

     hoje = format( new Date(),"yyyy-MM-dd",{timeZone: "America/Sao_Paulo"})
    // hoje = new Date().toISOString().substring(0,10)

    private dataValidator: ValidatorFn = (control:
        AbstractControl<any, any>): ValidationErrors | null => {
            console.log(new Date(control.value).getTime() <= new Date().getTime() )
            console.log( this.hoje)
        if (new Date(control.value).getTime() > new Date().getTime() ) {
            return { dataInvalida: true }
        }
        return null;
    }

   private subscriptions = new Subscription();
    autores:AutorInterface[] = [];
    livroForm = new FormGroup({
        titulo: new FormControl('',[
            Validators.required,
            Validators.minLength(3)
        ],),
        subtitulo: new FormControl(''),
        paginas: new FormControl(0,Validators.min(5)),
        isbn: new FormControl('',[
            Validators.minLength(10),
            Validators.maxLength(10)
        ]),
        editora: new FormControl('',Validators.maxLength(20)),
        ano: new FormControl(this.hoje,[this.dataValidator]),
        logo: new FormControl('',Validators.required),
        preco: new FormControl(0,Validators.min(0)),
    })

    constructor(
        private autorService: AutorService,
        private alertService: AlertService
    ){}
    ngOnInit(): void {
        this.carregaAutores()
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    carregaAutores(){
        const subscription = this.autorService.getAutores().subscribe(
            (autores) =>{
                console.log(autores);
                this.autores = autores;
            },
            (error) =>{
                console.log(error);
                this.alertService.error('Não foi possivel carregar os autores, contate o suporte.')
            }
        )
        this.subscriptions.add(subscription);
    }

    submitForm(){
        console.log(this.livroForm)
        this.ueFunction()
    }

    ueFunction(){
        console.warn("Ué")
    }

 

}