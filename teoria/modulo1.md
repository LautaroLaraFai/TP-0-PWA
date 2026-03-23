# Preguntas Teóricas

### *¿Qué significan los conceptos de scope, hoisting y mutabilidad en JavaScript? Explicá con ejemplos simples.*
    - Scope: alcance de algo, comunmente de las variables. Por ejemplo, el tipo de variable var tiene un alcance global en js, mientras que const o let tienen menos alcance.

    - Hoisting: Es un proceso en el cual las variables o funciones se inicializan antes de utilizarlas, funciona bien con las funciones pero por ejemplo con las variables <span style="color: #00FF00;">var</span> las inicializa con `undefined`, por eso no se recomienda utilizar var sino let o const, que las inicializa pero quedan en una zona muerta hasta que se utilizen.

    - Mutabilidad: Se refiere a la capacidad de cambiar el estado o valor de una variable o estructura de datos después de su creación, los datos mutables son aquellos que pueden cambiar su contenido y se modifica el contenido original.

### *¿Qué diferencias hay entre var, let y const en cuanto a scope, hoisting y mutabilidad ¿Cuándo usarías uno y cuándo otro.*
    - Var: scoping global, se inicializa en undefined lo que puede causar problemas, y es mutable.

    - Let: scoping dentro de la funcion o bloque de codigo donde se defina, se inicializa pero queda en una zona muerta hasta que se le asigne un dato, y es inmutable.

    - Const: scoping dentro de bloque de codigo, se inicializa pero queda en una zona muerta hasta que se le asigne un dato, y crea una referencia inmutable a un valor, es decir, el valor no puede cambiarse. 

### *¿Qué pasa si intentás usar una variable declarada con let antes de su declaración? ¿Y con var?*
    - Con let funciona normalmente, con var en cambio causaria errores ya que tiene como valor undefined.

### *¿Qué significa que JavaScript sea un lenguaje de tipado dinámico?*
    - Que los tipos de datos en una misma variable pueden variar, se puede declarar una variable por primera vez como string, y despues podrias cambiarselo a number, array, object, etc.

### *¿Cuál es la diferencia entre undefined y null en JavaScript?*
    - Es una diferencia semantica, undefined es que no tiene un valor definido, null es algo que no contiene nada.

### *¿Qué tipo de valor es NaN y en qué situaciones puede aparecer?*
    - NaN es un `number`, puede aparecer en:
        - operaciones matemáticas inválidas: división por cero (por ejemplo, 0 / 0), raíz cuadrada de un número negativo. 
        - Conversión fallida de tipos: intentar convertir una cadena que no representa un número (como "texto") a un valor numérico con parseInt() o parseFloat(). 
        - Cálculos con valores indefinidos: usar una variable no asignada o con valor undefined en operaciones aritméticas.
        - Propagación de errores: cualquier operación que involucre un valor NaN también devuelve NaN.

### *¿Qué hace el operador typeof y qué valores puede devolver?*
    - Devuelve el tipo de dato de una variable, puede devolver string, boolean, number, object, undefined, etc.

### *¿Qué diferencias hay entre usar comillas simples, dobles o backticks para strings?*
    - Ninguna

### *¿Por qué typeof null devuelve "object" y por qué se considera un bug histórico?*
    - Eso se debe a que typeof solo lee los primeros bits en una direccion de memoria, y justo null y object empiezan de la misma forma, asi que typeof(null) devuelve object