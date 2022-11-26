# Miiniaoc-2022-Web-reactiva - Reto 2: Coordenadas ermitañas

SuperCoco ha escapado del emplazamiento del [reto 1](https://github.com/webreactiva-devs/desafio-miniaoc-2022/blob/main/reto-1.md): demasiados turistas buscando dragones.

Date cuenta que aunque sea un “muñeco”, puede volar y volar.
Cancel changes
Así que ahora está en un lugar completamente desconocido y nos ha mandado una señal “falsa”, la verdadera te cuento donde la va a “inyectar” más abajo.

La señal que ha enviado es esta:

`{2035}`

Sabemos que ese número equivale a unas coordenadas terrestres. Pero no sabemos si la correcta es `{2.03,5}` o `{2,0.35}` o cualquiera de las otras combinaciones posibles.

Tu misión será averiguar cuáles son las coordenadas “ermitañas” escondidas en esa cadena de números.

|


## ¿Dónde aparece el mensaje con las coordenadas ermitañas a resolver?

👉 **En la newsletter [Reactivísim](https://reactivisima.com/subscribe/) del domingo 20 de Noviembre.**

Pondrá algo así como “Pista de Supercoco” y a continuación las coordenadas ermitañas camufladas entre llaves.

Esas coordenadas las podrás lanzar contra una API (como en el reto anterior) que te devolverán la respuesta correcta con la localización de SuperCoco si aciertas ;)

|

## Tu reto es el siguiente

Escribir un código en el lenguaje que quieras donde al introducir como parámetro una cadena de números entre corchetes me devuelva todas las opciones posibles de coordenadas terrestres inscritas en esa cadena.

Reglas:
- Son coordenadas terrestres con lo que están limitadas a -90 a 90 en Latitud y -180 a 180 en Longitud [(ver en la wikipedia)](https://en.wikipedia.org/wiki/Geographic_coordinate_system) [(ver en SO)](https://stackoverflow.com/questions/15965166/what-are-the-lengths-of-location-coordinates-latitude-and-longitude#:~:text=Valid%20longitudes%20are%20from%20%2D180,the%20poles%20are%20not%20indexable.)
- Primero va la Latitud y luego la Longitud, tanto en el input como en el output
- No hay un límite de longitud del input de la cadena entre llaves
- El signo no aparece en el input de la cadena de números entre llaves pero si es parte de las posibles soluciones
- La coordenada siempre tiene al menos un decimal en Latitud y otro en Longitud. Puede tener más de 1 y el último decimal puede ser el 0.
- La coordenada nunca empieza por 0 ni el Latitud ni en Longitud
- La coordenada nunca es un 0 seguido de decimal ni el Latitud ni en Longitud

La salida es:
- Las dos coordenadas separadas por comas
- Los decimales con puntos
- Resultado entre llaves

Veámoslo con un ejemplo:

Dato de entrada en el código: `{2035}`

Salidas posibles: `{2,035}`, `{20,35}`, `{203,5}`, `{2,0.35}`, `{2,03.5}`, `{2.0,3.5}`, `{2.03,5}`, `{20.3,5}`

Descartes: 
- `{2,035}`, `{20,35}`, `{203,5}`, `{2,0.35}`, `{2,03.5}`, `{2.03,5}`, `{20.3,5}` por no tener  al menos un decimal una de las dos coordenadas (o las dos)
- `{2,035}`, `{2,0.35}`,`{2,03.5}` por empezar por cero

En este caso solo hay un resultado válido: `{2.0,3.5}`

Y, además, sus combinaciones con negativos:  `{-2.0,3.5}`,  `{2.0,-3.5}`,  `{-2.0,-3.5}`.

Si la cadena de coordenadas ermitañas fuera `{2035}` estas serían entonces las 4 posibles soluciones: `{2.0,3.5}`, `{-2.0,3.5}`,  `{2.0,-3.5}`,  `{-2.0,-3.5}`

Una vez lo hayas descubierto podrás confirmar si la localización es correcta enviando una petición a una API artesana.

La API se conecta así:

![reto-2-api](https://user-images.githubusercontent.com/1122071/202252773-434b100a-f84a-4745-931f-9ad2f2472f87.png)


|

## Sistema de puntos

1. Un punto por la solución correcta.
2. Dos puntos más si entregas la solución antes del 23 de Noviembre a las 23:59.
3. Dos puntos más si inlcuyes test unitarios en la solución (al menos 3 tests unitarios)
4. Tres puntos más si utilizas en la solución un lenguaje de programación desconocido para ti.