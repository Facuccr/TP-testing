# Laboratorio introductorio: pruebas automatizadas en Express.js

**Taller de Lenguajes de Programación IV · Unidad 4 · Octubre de 2026**

## 2. Conocer la aplicaión
a. ¿qué archivo contiene la regla de cálculo?
- El archivo src/services/precios.ts es donde se encuentra la funcion calcularPrecioFinal(precio, descuento) que aplica el descuento sobre el precio

b. ¿Qué archivo define la ruta HTTP?
- El archivo src/app.ts es donde estan definidas las rutas web como

c. ¿En qué se diferencian sus responsabilidades?
- **El servicio** (precios.ts): Se encarga de la logica de negocio. Su tarea es procesar datos y hacer los calculos. 

- El **controlador** (app.ts): Se encarga de la interfaz encargada de comunicar. Su responsabilidad es recibir la peticion que manda el cliente, extraer los parametros del cuerpo del mensaje, delegarle el procesamiento a la funcion del servicio, y finalmente agarrar ese resultado y devolverlo en una respuesta HTTP con formato JSON 

## 3. Ejecutar las pruebas disponibles

a. ¿Qué comportamiento exige? 
- La instruccion expect(...).toThrow(RangeError) exige que la funcion rechace la operacion y lance una excepcion de tipo RangeError al detectar que el descuento es del 150 %

b.¿Qué hace realmente el código?
- Como la funcion aun no tiene validaciones incorporadas, mira los parametros aplicando la formula. Calcula el 150 % y se lo resta al precio original, devolviendo un total negativo de -500. La prueba falla porque la funcion termina su ejecucion retornando un numero normalmente en lugar de interrumpirse y arrojar el error

## 4. interpretar la falla

a. ¿Qué total devuelve actualmente un descuento del 150 % sobre $1.000?
- Actualmente devuelve -500. Al no tener validaciones, la funcion realiza el calculo: resta 1.500 al precio base de 1.000.

b. ¿Por qué ese resultado no cumple la regla de negocio?
- No cumple la regla de negocio porque un descuento no puede superar el 100 % del valor original del articulo. Un total negativo implica que el comercio le paga al cliente por llevarse el producto

¿Por qué la prueba falla si la función terminó de ejecutarse?
- la prueba falla porque justamente la funcion terminó de ejecutarse, lo que está esperando vitest es que ocurra una excepcion.

## 6. Agregar pruebas unitarias
a. Desafío adicional: agregá una prueba para NaN como precio. ¿La validación actual lo rechaza?

- Si, la validación actual rechaza el NaN. Esto sucede porque anteriormente use Number.isFinite(precio), Como NaN no es un numero finito, la evaluacion da false y activa el lanzamiento del RangeError inmediatamente


## 7. Primera prueba de integración HTTP
a. Ejecutá npm test nuevamente. Explicá por qué esta comprobación es de integración y no solamente una prueba unitaria.

- esta comprobacion es de integracion ya que evalua todo un flujo completo, o sea, primero evalua que app.js reciba la peticion, envie los datos hacia el servicio, reciba el RangeError que lanza el servicio por el descuento invalido, y finalmente transforme eso en una respuesta HTTP 400

## 8. Diferenciar pruebas y verificación de tipos

a. ¿por qué conviene utilizar tanto typecheck como npm test?

Conviene utilizar ambos comandos porque validan dimensiones complementarias del código y detectan diferentes categorías de errores:
- npm run typecheck: Verifica la estructura del codigo sin ejecutarlo. Asegura que las variables, parametros y retornos coincidan con las firmas declaradas. No evalúa si la lógica matematica o de negocio es correcta.

- npm test: Ejecuta el código real y evalúa si hace lo que debe hacer. Asegura que las fórmulas devuelvan los valores correctos y que se apliquen las reglas de negocio.

## 12. Síntesis y preguntas de repaso

¿Por qué una API que devuelve una respuesta HTTP 200 puede contener errores de negocio?
- Porque un 200 solo significa que el servidor recibio la peticion y respondio sin romperse, pero la cuenta que hace por detras puede dar un resultado equivocado

¿Qué diferencia hay entre una prueba unitaria y una de integración?
- La unitaria revisa una sola cosita aislada, como una formula de calculo. La de integracion revisa si varias partes andan bien cuando se comunican entre si, como la cuenta y la ruta web juntas. 

¿Por qué toThrow recibe una función en lugar del resultado de ejecutarla?
- Porque si le pasamos el resultado, el error salta de una y corta todo el programa. Si le pasamos la funcion, la prueba la ejecuta a proposito y de forma controlada para poder atajar el error y ver si era el que esperabamos.

¿Qué diferencia existe entre npm test y npm run typecheck?
- El typecheck solo lee el texto del codigo para avisar si mezclamos tipos de datos por ejemplo, poner letras donde va un numero. El test hace andar el programa de verdad para ver si la logica funciona bien.

¿Qué aporta GitHub Actions al trabajo colaborativo?
- Ayuda un mucho porque cada vez que alguien del equipo sube un cambio nuevo, el sistema corre todas las pruebas de forma automatica en la nube. Asi evitamos que alguien rompa el codigo del resto sin darse cuenta antes de juntar el trabajo