# PROYECTO "MOTI" — DOCUMENTO DE ESPECIFICACIÓN COMPLETA

> **Documento de transferencia de contexto.** Volcado íntegro de todo lo definido en la conversación de diseño del proyecto. No se ha resumido ni omitido contenido acordado.
>
> **VERSIÓN 2.** Las secciones 1–17 conservan el registro histórico de la conversación, incluidas las marcas `[PENDIENTE]` originales. **Todos esos pendientes fueron cerrados en la Sección 19**, que es la que manda en caso de contradicción. Las secciones 20 y 21 contienen los textos legales que faltaban.
>
> **Uso:** entregar este archivo completo a un agente de IA en un proyecto nuevo, junto con el prompt de arranque de la Sección 18.
>
> **Advertencia:** las decisiones legales, societarias, tributarias y de precios de la Sección 19 son criterios de diseño, **no asesoría profesional**. Deben ser validadas por un abogado comercial colombiano y un contador antes de operar.

---

## 1. NOMBRE, CONCEPTO Y PROPUESTA DE VALOR

### 1.1 Nombre
**Moti**

### 1.2 Naturaleza jurídica del producto
Moti **no es una empresa de transporte**. Es una **plataforma de intermediación tecnológica de libre uso comercial**, amparada bajo un **Contrato de Licencia de Uso No Exclusivo (EULA — End User License Agreement)**.

Definición legal exacta acordada: *"Plataforma de Intermediación Tecnológica bajo Licencia de Uso Comercial"*.

El usuario no paga un flete: paga una **tarifa por el derecho a usar las funciones del código del software** para buscar un conductor, un cargador o un capitán.

### 1.3 Concepto
Punto de encuentro digital autónomo y transparente que conecta transportistas independientes con usuarios en el nodo fronterizo **Leticia (Colombia) – Tabatinga (Brasil)**, con expansión fluvial hacia corregimientos del Amazonas: **Tarapacá, La Chorrera y Puerto Nariño**.

Integra en una sola plataforma:
- Transporte urbano de personas (motos, motocarros).
- Logística terrestre de carga liviana (motocargas, acarreos, trasteos pequeños).
- Despacho y rastreo fluvial masivo (lanchas y barcos de carga).

### 1.4 Problema que resuelve
- Elimina el desgaste físico y la ineficiencia operativa en una región aislada geográficamente.
- Elimina la incertidumbre financiera (precios pactados por adelantado, sin sorpresas).
- Elimina el papeleo físico de los manifiestos de carga fluvial (papeles que se mojan o se pierden).
- Elimina la espera a ciegas en los muelles bajo sol o lluvia.
- Reduce el riesgo de hurtos mediante pagos digitales, tokens de entrega y verificación de identidad.
- Formaliza y visibiliza el **gremio de las motocargas**, hoy completamente invisible y desorganizado.

### 1.5 Filosofía del fundador (declarada explícitamente)
> "A mí solo me gusta crear soluciones que agilicen los procesos autónomos de la humanidad para agilizar las tareas y evitar el desgaste físico."

Consecuencia de diseño: **el sistema debe autorregularse y correr solo, con cero desgaste administrativo para el dueño** (cero oficina, cero soporte humano, cero conciliaciones manuales).

### 1.6 Ventaja competitiva y urgencia de mercado
- Competidor local identificado: **Leticia Express** y las agencias tradicionales de carga del muelle. Tienen el monopolio físico y la clientela de años, pero operan a la antigua: llamadas telefónicas, cuadernos de contabilidad, desorden en los muelles, clientes adivinando cuándo llega el barco. **No tienen app.**
- Objetivo estratégico declarado: **aprovechar la ventaja antes de que ellos ganen más terreno y se digitalicen.**
- El componente de seguimiento fluvial hacia corregimientos como Tarapacá o La Chorrera es un diferenciador que ninguna aplicación grande (Uber, DiDi) tiene capacidad de resolver.

---

## 2. PÚBLICO OBJETIVO Y CASOS DE USO

### 2.1 Territorio
- **Núcleo:** Leticia (Amazonas, Colombia) y Tabatinga (Amazonas, Brasil). Frontera abierta por tierra (Avenida Internacional).
- **Expansión fluvial:** Tarapacá, La Chorrera, Puerto Nariño y comunidades sobre los ríos Amazonas y Putumayo.

### 2.2 Actores / público
1. **Pasajero local** (habitante de Leticia y Tabatinga) — día y noche.
2. **Turista** nacional (colombiano del interior) y extranjero — llega por el Aeropuerto Alfredo Vásquez Cobo.
3. **Comerciante local** — tiendas de abarrotes, depósitos, ferreterías, graneros, distribuidoras.
4. **Remitente de mercancía** (Usuario 1).
5. **Destinatario de mercancía** (Usuario 2) — en corregimiento de destino.
6. **Mototaxista** (moto de pasajeros).
7. **Conductor de motocarro** (turistas con maletas, pasajeros).
8. **Conductor de motocarga** (mercancía, trasteos pequeños, acarreos).
9. **Ayudante del conductor de motocarga** ("la liga" / jornal diario).
10. **Cargador / cotero del muelle**, organizado en cuadrillas con **Líder de Cuadrilla**.
11. **Capitán de barco / lanchero**.
12. **Administrador de la plataforma** (dueño de Moti).

### 2.3 Casos de uso principales
- Turista aterriza en el aeropuerto de Leticia, escanea un código QR y descarga la app para moverse.
- Local pide mototaxi de noche al salir de un restaurante, bar o casino.
- Comerciante envía 20 cajas pequeñas delicadas de Leticia a Tarapacá: cotiza, negocia con el cargador, contrata motocarga, reserva cupo en el barco, paga y rastrea.
- Comerciante mueve mercancía del muelle o del aeropuerto a su local en motocarga.
- Trasteo pequeño dentro de la ciudad con conductor + ayudante.
- Destinatario en Tarapacá recibe alerta de que el barco está llegando y baja al muelle con su token.
- Turista brasileño en Tabatinga pide un motocarro y paga con Pix.
- Comerciante formal necesita factura electrónica DIAN de su flete.

### 2.4 Contexto de mercado justificado
- Motocarros: para turistas con maletas. Motos: para locales. El carro particular es escaso y costoso en el Amazonas.
- El comercio de Leticia vive de mover mercancía desde el muelle turístico y el aeropuerto hacia los locales comerciales.
- Frontera abierta: se pasa de Colombia a Brasil sin darse cuenta. La app debe ser binacional (español y portugués, pesos y reales).

---

## 3. ALCANCE

### 3.1 Qué INCLUYE
- App móvil para Android e iOS (prioridad 90% Android en la primera fase).
- Portal web para comerciantes mayoristas.
- Dashboard web de administración.
- Transporte de personas: motos y motocarros.
- Transporte de carga terrestre: motocargas (y motocarros/carro cuando aplique).
- Transporte fluvial: lanchas y barcos, con manifiesto digital y rastreo satelital.
- Servicio de "conector de carga" (cargadores del muelle) con negociación de tarifa.
- Módulo financiero: Efectivo, Nequi (llave / Push), Pix, billetera interna y retiros 24/7.
- Alertas viales colaborativas y señalización de PARES ocultos.
- Modo Turista temporal.

### 3.2 Qué queda EXPLÍCITAMENTE FUERA
- **Responsabilidad sobre la mercancía.** Moti no custodia, no inspecciona, no responde por pérdida, daño, hurto, retención aduanera ni destrucción. *(Decisión textual del fundador: "nosotros no nos hacemos responsables por mercancía, esa es la idea").*
- **Gestión de devoluciones o rechazos de carga.** Una devolución es un **viaje nuevo e independiente**, cotizado y pagado desde cero.
- **Resolución de disputas comerciales** entre remitente y destinatario.
- **Billetera virtual compartida ("Moti-Monedero")** para transferir saldo entre familiares — **descartada**.
- **Conversor de divisas automático conectado a API de TRM oficial** — **descartado** como fuente única (ver Sección 15).
- **Tarifas dinámicas por clima / "factor aguacero"** — **descartadas**.
- **Penalización económica al cliente por cancelación** — **descartada**.
- **"Moti-Fiado" / crédito a fin de mes** — **descartado**.
- **Recaudo por la app del dinero de los coteros en la primera fase** *(ver matices en Sección 4.7)*.
- **Envío de SMS automáticos desde los servidores de Moti a números no registrados** — descartado por ciberseguridad.

---

## 4. FUNCIONALIDADES (una sección por funcionalidad)

---

### 4.1 Captación por Código QR en el Aeropuerto

**Descripción.** El Aeropuerto Alfredo Vásquez Cobo de Leticia es el embudo por donde entra el 100% del turismo. Se instalan stickers QR llamativos con un mensaje del tipo *"Moverse en Leticia y Tabatinga seguro y barato"*.

**Flujo.**
1. El turista aterriza y ve el sticker QR.
2. Escanea con la cámara del celular.
3. El QR redirige a Play Store o App Store según el sistema operativo.
4. Descarga la app (< 50 MB, menos de un minuto con datos móviles básicos o Wi-Fi del aeropuerto).
5. Se registra (usuario normal o Modo Turista).

**Reglas de negocio.**
- El enlace debe ser compartible por redes sociales.
- El QR debe dirigir a la app construida en Flutter (código único para ambos sistemas).

---

### 4.2 Transporte Multimodal Terrestre (Personas y Carga)

**Categorías independientes:**

| Categoría | Uso |
|---|---|
| 🛵 Moto | Pasajeros; 1 bolsa o paquete pequeño |
| 🛺 Motocarro | Turistas con maletas, pasajeros; hasta 5 cajas medianas |
| 🚛 Motocarga | Bultos pesados, mercancía, trasteos pequeños, acarreos |
| 🚢 Lancha / Barco | Carga fluvial y encomiendas |

**Reglas de negocio.**
- Asignación **por cercanía geográfica en tiempo real**: el backend escanea las motocargas/motocarros encendidos y disponibles en las cuadras más cercanas y timbra primero al más cercano. Beneficio: llega en minutos y gasta menos gasolina.
- **Restricción del muelle:** si el destino es el Muelle Turístico o el Muelle de Carga de Leticia y el inventario incluye cajas o bultos pesados, el sistema **desactiva automáticamente la categoría "Moto común"**.
  - Mensaje en pantalla: *«⚠️ Por regulaciones locales, el ingreso de carga en moto común está prohibido en el muelle. Elige un Motocarro o Motocarga autorizado para completar tu envío».*
  - Justificación real: al muelle solo se puede entrar a pie, en motocarga, motocarro o carro.

---

### 4.3 Módulo especializado de Motocargas

**Descripción.** El gremio de las motocargas está invisible y desorganizado; hoy conseguir una es una lotería (ir a buscarlas a esquinas específicas, adivinar el precio o tener el teléfono de un conocido). Un camión es demasiado caro y estorboso para 15 cajas; un mototaxi no tiene capacidad. La motocarga resuelve ese término medio.

**Funciones exclusivas acordadas.**

1. **Tarifas por "Tipo de Esfuerzo" o Volco / características del vehículo.**
   El conductor registra las características de su motocarga (estacas altas, platón plano, **carpa para la lluvia** — vital en el Amazonas). El cliente puede filtrar: *"Motocarga con carpa para la lluvia"*.

2. **Botón "Ayuda con la Carga" (Conductor + Ayudante).** Ver 4.4.

3. **Geolocalización en "Modo Parada Comercial".** Las motocargas pueden ponerse en modo espera cerca de los principales depósitos o graneros del centro comercial de Leticia. Cuando un comerciante sale con sus bultos, abre Moti, ve las motocargas a la vuelta de la esquina y la solicitud se completa en 2 minutos.

**Beneficio para el gremio.**
- Ingresos constantes: hoy pasan horas parados en una esquina.
- Seguridad frente a robos: al estar registrados con cédula y papeles, los comerciantes prefieren contratarlos por la app antes que meter mercancía costosa en una motocarga de la calle desconocida.

**Idea planteada — CERRADA, no se implementa.** Se propuso que almacenes de electrodomésticos o ferreterías de Leticia dejaran a Moti Motocargas como su transportador oficial.

**Decisión del fundador:** *"esto no lo decido yo, lo decide la misma gente al utilizar la app; es quien elige."*

Moti **no designa, no certifica y no asigna** transportadores oficiales. El almacén abre la app y escoge a quien quiera. Si un motocarguero termina siendo el de siempre para una ferretería, es porque se lo ganó con su trabajo y sus estrellas, no porque la plataforma lo haya nombrado.

**Además hay una razón legal:** que Moti designe operadores oficiales sería curar y respaldar a un proveedor, lo que la acerca a ser una empresa de transporte que asigna prestadores. Contradice la Sección 10.

**Lo único que sí se puede construir**, porque no es Moti eligiendo sino el usuario eligiendo más rápido: una lista de **favoritos o "el de siempre"** para volver a llamar al operador que ya usó antes. Fase 2, opcional. Ver P30 en la Sección 19.4.

---

### 4.4 Módulo "Conductor + Ayudante" (la liga)

**Descripción.** En un trasteo pequeño (una cama, una lavadora, unas cajas) el cliente a veces no puede alzar solo. El conductor de la motocarga se lleva a un ayudante (vecino, familiar, alguien que quiera ganarse el diario) y se divide la vuelta. Es un generador de empleo local.

**Flujo.**
1. Al pedir la motocarga, el cliente activa la casilla: `[✓] Necesito ayuda para cargar (Conductor + Ayudante)`.
2. El sistema calcula distancia y volumen y **suma un valor fijo estandarizado que va directo al ayudante**.
3. El cliente ve el total desglosado antes de confirmar.

**Ejemplo de desglose acordado:**
```
Tarifa del viaje: $15.000 + Liga del Ayudante: $20.000 = Total: $35.000 COP
```
*(En una mención previa se citó "+$15.000 COP" como valor del modificador; el valor consolidado en los ejemplos posteriores es **$20.000 COP**.)* `[PENDIENTE: fijar el valor definitivo de la liga del ayudante]`

**Opciones de la pantalla:**
- 🔘 Solo transporte: el conductor solo maneja; el cliente sube y baja las cosas del volco. (Tarifa estándar).
- 🔘 Transporte + Conductor Ayudante: el conductor ayuda a alzar y acomodar.

**Reparto digital.** Si el cliente paga por Nequi o contraentrega, el Panel de Administración le marca al conductor cuánto del viaje es para él y cuánto es la liga limpia del ayudante, para que se la pague en efectivo apenas terminen de bajar el último bulto.

**Blindaje legal:** ver cláusula literal en Sección 10.7.

---

### 4.5 Recargo Nocturno

**Descripción.** Aplica a **transporte de personas** (motos y motocarros) y también se definió para el transporte terrestre en general. Sustituye al "cobro a ojo" nocturno del conductor.

**Reglas de negocio.**
- Horario configurable. Valores citados en la conversación: **de 8:00 PM a 5:00 AM**, y en otra mención **desde las 7:00 PM u 8:00 PM hasta las 5:00 AM**. `[PENDIENTE: fijar el horario definitivo]`
- El recargo se suma automáticamente y **se muestra desglosado en pantalla antes de confirmar**.
- El excedente nocturno **va directo al bolsillo del conductor**.
- Evita el clásico *"Hermano, a esta hora le cobro el doble"*.

**Ejemplo de desglose acordado (pasajeros):**
```
🛵 Tarifa base del viaje: $4.000 COP
🌙 Recargo nocturno:     $2.000 COP
💰 Precio Final Moti:    $6.000 COP
```
**Ejemplo citado para carga terrestre:** recargo de **+$3.000 COP** al viaje.

---

### 4.6 Flujo integrado de envío "End-to-End" (Tierra ➡️ Río)

**Descripción.** El cliente en Leticia tiene un dolor de cabeza triple: buscar el barco, buscar quién lleve las cajas al muelle, y pelear con los cargadores por el precio. Moti resuelve los tres pasos en un solo flujo.

**Orden definitivo de las pantallas (reestructurado por decisión del fundador):**

1. **Paso 1 — Inventario de carga.** El cliente selecciona qué va a enviar (ej. 20 cajas pequeñas delicadas) y el destino.
2. **Paso 2 — Selección y negociación con el Cargador (antes de buscar el carro).** Ver 4.7.
3. **Paso 3 — Selección del transporte terrestre.** La app pregunta:
   > «¡Cupo reservado en el barco "El Gran Delfín"! 🚢 Ahora, ¿cómo vas a llevar tu mercancía al muelle?»
   - 🔘 **Opción A:** "Ya tengo mi propio transporte" ➡️ pasa directo al recibo y al código. No pasa nada.
   - 🔘 **Opción B:** "Necesito transporte al muelle" ➡️ despliega opciones según volumen (Moto / Motocarro / Motocarga), con la restricción de muelle aplicada.
4. **Paso 4 — Reserva de cupo en el barco** (día de salida, tarifa).
5. **Paso 5 — Método de pago** (Origen o Destino; Efectivo, Nequi Push o Pix).

**Regla clave:** como el trato con el cargador ya está cerrado, al conductor de la motocarga se le avisa: *"Vas para el muelle, el Líder Carlos ya está asignado para recibirte las 20 cajas"*.

**Por qué este orden es mejor (justificación acordada):**
- Elimina la incertidumbre: el cliente no arriesga mandar la mercancía al muelle para que luego le cobren un precio exagerado en la orilla.
- Eficiencia en el muelle: al llegar la motocarga, la descarga es inmediata porque el líder ya coordinó a sus empleados con carretillas o al hombro.

---

### 4.7 Módulo "Moti-Conector" de Carga (Cargadores / Coteros del muelle)

**Contexto real documentado.**
- Los cargadores son **el eslabón o puente físico que conecta el vehículo de tierra con el barco**. No son empleados del barco ni del puerto. Sin ellos la mercancía se queda en el cemento: el conductor de la motocarga solo llega hasta donde frena el vehículo, y el capitán no se baja a alzar bultos porque cuida la máquina y los comandos.
- Se organizan en **varios grupos/cuadrillas**, cada uno con un **Líder** al que se le paga; el líder reparte entre sus empleados.
- El costo le corresponde al dueño de la mercancía.
- El fundador declaró no conocer con exactitud cómo cobran ellos.

**Solución adoptada (marketplace con oferta y contraoferta) — idea del fundador:**

1. El cliente registra el inventario (ej. 20 cajas pequeñas delicadas).
2. **Antes de buscar el carro**, la app le muestra la lista de **Líderes de Cuadrilla activos en el muelle** en ese momento.
3. El sistema envía automáticamente el inventario a los cargadores disponibles.
4. **Oferta del cargador:** el líder mira el volumen en su celular y lanza su precio base.
   > 👷‍♂️ Líder Carlos (Cuadrilla Muelle Central) ofrece: $25.000 COP por el embarque.
5. **Contraoferta del cliente:** botón de contraoferta.
   > 📱 "Te doy $20.000 COP porque son cajas livianas".
6. Si el cargador acepta en su pantalla, **el trato se cierra digitalmente**. El cargador ya sabe qué viene y cuántas piezas son.

**Pantalla del cargador (marketplace en tiempo real):**
- Alerta vibratoria con el inventario exacto: *"Nueva Carga en el centro: 20 cajas de cerveza + 5 pacas de papel. Destino: Muelle Central ➡️ Barco El Gran Delfín"*.
- Botón 1: `[Aceptar Tarifa Sugerida de la App: $25.000 COP]`
- Botón 2: `[Lanzar Contraoferta: $____ COP]`

**Desglose "todo incluido" acordado (ejemplo):**
```
🚛 Transporte en Motocarga (De la tienda al muelle): $15.000 COP
💪 Conector de Carga (Bajar del carro y subir al barco): $20.000 COP ($1.000 por caja)
🚢 Flete Fluvial (Viaje en barco hasta Tarapacá):       $100.000 COP
💰 TARIFA TOTAL TODO INCLUIDO:                          $135.000 COP
```

**Opciones evaluadas para el problema de los coteros (histórico completo):**
- **Solución A:** botón opcional "Añadir Servicio de Cargue (Cotero)" con valor fijo estandarizado (+$1.000 COP por bulto/caja), recaudado por el capitán o el motocarga y entregado en efectivo al líder.
- **Solución B:** convenio de Moti con el gremio de cargadores; tarifa fija pactada en la app; solo coteros autorizados de ese muelle hacen el trabajo.
- **Solución C:** desligar el costo y dejar solo la alerta legal.
- **Solución de arranque recomendada en la conversación ("Aviso de Convivencia Local"):** dejar el cobro fuera de la app en la primera fase, con avisos obligatorios en pantalla:
  > «⚠️ Nota sobre el muelle: Los costos de cargue y descargue (coteros) son administrados de forma independiente por los líderes de las cuadrillas del puerto en Leticia. Este valor no está incluido en la tarifa de Moti y debe ser cancelado por el propietario directamente en el sitio según el volumen de la mercancía».

  Y al conductor de la motocarga:
  > «Tu viaje finaliza en la zona de descargue autorizada del muelle. El traslado de la mercancía desde tu vehículo hasta el interior del barco corresponde a los cargadores locales».

- **Idea de futuro ("Moti-Botón" para el Líder de Cuadrilla):** cuando Moti ya mueva el 80% de la carga en Leticia, el líder cotiza en vivo desde su app al ver la motocarga en camino, el cliente acepta, y el líder recibe su pago digital.

`[PENDIENTE: definir cuál de los modelos (A / B / C / Aviso de Convivencia / Marketplace con pago digital al líder) se implementa en la Fase 1. En la conversación se aprobó el marketplace de oferta/contraoferta como idea del fundador, y en paralelo se había recomendado el "Aviso de Convivencia" como arranque seguro. No se cerró explícitamente cuál queda.]`

---

### 4.8 Comunicación Cliente ↔ Cargador ↔ Conductor

**Descripción.** El cliente debe poder hablar con la persona que tiene su mercancía en los hombros, sin revelar números de teléfono privados.

**Componentes acordados:**

1. **Chat interno tripartito y notas de voz en tiempo real.** Se abre automáticamente entre **Cliente, Conductor de tierra y Cargador** en el momento en que la motocarga llega al muelle y el Líder acepta la tarea.
   - Ejemplo cliente: *"Ojo amigo cargador, las dos cajas amarradas con cinta azul son huevos, para que las ponga arriba por favor"*.
   - Ejemplo cargador: *"Listo patrón, ya las tengo en la mano, van para la cabina del barco"*.
   - Las notas de voz son muy usadas en la zona: soporte obligatorio.

2. **Confirmación fotográfica de embarque ("Foto de Éxito").** Los cargadores no tienen tiempo de escribir mientras alzan bultos. Al terminar de acomodar la carga en la bodega del barco, el líder toma una foto de cómo quedó distribuida y la sube.
   - Notificación al cliente: *«¡Tu carga ya está a bordo! 🚢 El conector de carga ha subido tus 20 piezas al barco "El Gran Delfín". Ver foto del embarque»*.

3. **Traducción automática del chat (Español ↔ Portugués) con IA.** Ejemplo: el cargador escribe *"Já coloquei as caixas no barco"* y al cliente le aparece *"Ya puse las cajas en el barco"*.

---

### 4.9 Módulo Fluvial — Oferta Programada del Capitán

**Descripción.** En los ríos el capitán es el rey de su barco: sabe cuánto espacio le queda, qué ruta hará y cuánto cobra según el tamaño de la carga.

**Panel del Capitán — configuración del viaje:**
1. **Creación de ruta:** origen, paradas intermedias y destino final (ej. Leticia ➡️ Puerto Nariño ➡️ Tarapacá).
2. **Día y hora de salida:** calendario (ej. sale el jueves a las 6:00 AM desde el muelle turístico).
3. **Tabla de tarifas propia**, escrita por el mismo capitán, en el formato local:
   - Por peso (Kilo / Arroba): $X
   - Por pieza pequeña (caja de cartón / bulto): $Y
   - Por pieza grande (nevera / motor fuera de borda): $Z
   - **Por tonelada (1.000 kg):** casilla especial, permite descuentos por volumen a grandes comerciantes.
     > Ejemplo acordado: "1 kilo a $2.000 COP, pero la tonelada a $1'500.000 COP".

**Pantalla del cliente — buscador y cotizador de barcos:**
1. Filtro de destino (ej. Tarapacá).
2. Inventario virtual (ej. 3 cajas y 2 bultos por peso).
3. **Cartelera de barcos disponibles esa semana:**
   ```
   🚢 Barco "El Gran Delfín" - Sale Jueves 6:00 AM - Tarifa total: $45.000 COP
   🚢 Lancha "La Bendición"  - Sale Sábado 8:00 AM - Tarifa total: $40.000 COP
   ```
4. Reserva: elige barco, selecciona pago en Origen o Destino, asegura su cupo.

**Registro de embarcaciones por nombre tradicional.** Idea propuesta: que el cliente pueda buscar el barco por su nombre popular ("El gran delfín", "La bendición") y no por un número de guía, respetando la cultura del río. `[PENDIENTE: no se respondió explícitamente, pero los ejemplos posteriores usan nombres de barco en toda la interfaz]`

---

### 4.10 Control de Aforo y Carga Pesada (Toneladas)

**Reglas de negocio.**
- El capitán configura el **límite de su embarcación en toneladas** (ej. "Capacidad máxima: 5 toneladas") y/o en piezas (ej. "máximo 80 cajas o 2 toneladas").
- A medida que los clientes registran bultos, cajas o cemento, **la app suma los pesos automáticamente**.
- Si un cliente intenta registrar un envío que supera el límite restante:
  > «Cupo máximo de carga pesada alcanzado para este viaje. Intente con otra embarcación disponible».
- **Alerta de calado y navegación:** si el barco va cerca de su límite de toneladas, navega más lento contra la corriente; el algoritmo de predicción **agrega horas extra automáticamente** al estimado de llegada.

**Justificación del soporte a toneladas:** el abastecimiento de Tarapacá y La Chorrera depende de materiales de construcción (cemento, varillas), combustible, víveres al por mayor y cargamentos comerciales grandes.

---

### 4.11 Cálculo de Peso vs. Volumen (Peso Volumétrico)

**Problema planteado por el fundador.** *"No es lo mismo una caja llena de cerveza que una caja con papel higiénico: no hace peso pero sí volumen."* Una caja gigante de papel higiénico o icopor no pesa nada pero ocupa el espacio de tres cajas de cerveza, haciéndole perder dinero al capitán.

**Opciones evaluadas:**
- **Opción A — Cálculo automático por Peso Volumétrico.** El cliente ingresa Alto × Ancho × Largo en cm; el código multiplica y divide por una constante estándar para barcos (por ejemplo, **entre 5.000**); compara peso real en báscula contra peso volumétrico y **cobra el que sea mayor**.
  > Ejemplo: la caja de papel higiénico pesa 2 kg en báscula, pero por su tamaño el algoritmo calcula 15 kg. Se cobra la tarifa de 15 kg.
- **Opción B — Clasificación visual por tipo de pieza.** Iconos sencillos:
  - 📦 Pieza Pequeña / Pesada (ej. caja de cerveza): tarifa estándar por peso en báscula.
  - 📦 Pieza Grande / Liviana (ej. pacas de papel higiénico, colchones, icopor): clasificada como "Volumen Alto", tarifa fija por espacio ocupado.

**DECISIÓN FINAL DEL FUNDADOR:** *"El cliente que va a enviar dice el peso, pero las dimensiones de la caja no; porque para enviar unas 20 cajas pequeñas delicadas uno no va a estar midiendo todas las cajas, sería muy tedioso."*

**Solución aprobada — Multiplicador de Piezas Estándar con Selector de Peso Total:**
1. **El cliente elige el "Tipo de Caja" con un toque.** 3 o 4 dibujos claros de los tamaños de caja más comunes del comercio local (basados en cajas de cerveza, cajas de abarrotes estándar o bultos de lona). Cada dibujo tiene un **volumen precalculado invisible** por el sistema.
2. **Multiplicador rápido (+ / −).** Si lleva 20 cajas iguales, selecciona el dibujo y presiona (+) hasta 20.
   ```
   [Icono de Caja Pequeña] x 20 piezas
   ```
3. **Escribe el peso bruto total** de todo el cargamento (báscula del muelle o aproximado si son toneladas).
   ```
   Ejemplo: 20 cajas pequeñas, Peso Total: 150 kg
   ```

**Cálculo del backend:**
1. Multiplica el volumen invisible de esa categoría por las 20 piezas.
2. Cruza ese volumen acumulado con el peso total escrito por el usuario.
3. Si el peso total es bajo para el espacio ocupado (caso papel higiénico) → **cobra por volumen**. Si el peso es alto (caso cerveza) → **cobra por kilos**.

**Resultado:** registro en menos de 10 segundos, en tres clics, sin cinta métrica.

---

### 4.12 Carga Delicada / Frágil

**Descripción.** Casilla marcable por el usuario: **"Mercancía Frágil"** (vidrio, huevos, medicamentos, tecnología que llega al aeropuerto).

**Efecto:** pone una **alerta amarilla en el manifiesto digital del capitán** para que esas cajas vayan encima de las toneladas de cemento y no abajo.

**Cobro:** posible pequeño valor extra por el cuidado especial. `[PENDIENTE: no se confirmó si se cobra extra ni cuánto]`

---

### 4.13 Manifiesto Fluvial Inteligente (TMS Fluvial)

**Descripción.** Convierte a Moti de una app de rastreo a un **TMS (Transportation Management System) Fluvial**. Los barcos funcionan como camiones de reparto: van parando en muelles y comunidades dejando cajas.

**1. Carga del manifiesto digital (en Leticia).** Antes de zarpar, el administrador de la embarcación registra qué mercancía sube. Cada caja o bulto se asocia a:
- Nombre y teléfono del cliente final.
- Muelle de destino (Puerto Nariño, Tarapacá, La Chorrera).
- **Orden de entrega**: la app acomoda automáticamente la lista según la ruta del río (el muelle más cercano primero, el más lejano al final).

**2. Automatización por Checkpoints (paradas).** Cuando el barco atraca en un muelle intermedio, el capitán marca **"Llegada a Puerto Nariño"** o presiona **"Iniciar Descarga en este Muelle"**. En ese milisegundo se generan dos acciones:
- **Alerta de Entrega Activa** a los clientes de ese muelle: *"Moti informa: El barco está descargando en tu muelle en este momento. Ten tu documento listo."*
- **Alerta de Proximidad** a los clientes del siguiente muelle: *"El barco ya zarpó de Puerto Nariño. Estimamos su llegada a tu muelle en 3 horas."*

**3. Etiquetas de recaudo en el manifiesto del capitán.** Cada caja lleva: `[PAGADO EN ORIGEN]` o `[🔴 POR COBRAR CONTRAENTREGA: $X pesos]`.

---

### 4.14 Rastreo Satelital vía Starlink

**Contexto.** Inicialmente se planteó que el río Amazonas y sus afluentes no tienen señal celular y que habría que usar checkpoints manuales. **El fundador corrigió: todos los barcos ahora usan señal satelital Starlink.** Esto convirtió el rastreo en tiempo real de "viable con condiciones" a **idea EXCELENTE de máxima prioridad**.

**Reglas de negocio.**
- El celular del capitán (o un dispositivo GPS económico instalado en la lancha) se conecta al Wi-Fi Starlink del barco.
- La app **envía coordenadas de latitud y longitud al servidor cada 30 segundos**.
- El cliente ve el icono de un barquito avanzando por el río Amazonas o el Putumayo en tiempo real.
- Cálculo de ETA por velocidad de navegación: *"Su mercancía llegará al muelle en aproximadamente 4 horas"*.

---

### 4.15 Algoritmo de Predicción de Llegada

**Problema.** Calcular tiempos en el Amazonas es difícil: la corriente varía según la época (invierno / vaciante) y el peso del barco.

**Lógica acordada.**
- El software mide la **velocidad promedio del GPS en las primeras 2 horas de viaje**.
- Cruza esa velocidad con la **distancia náutica restante**.
- Entrega una **ventana de tiempo realista**: *"Tu mercancía llegará entre el martes 25 y el jueves 27 de agosto"*.
- **A medida que el barco avanza, la ventana se va cerrando hasta dar la hora exacta.**
- El sistema conoce cuántas paradas programó el capitán antes del destino del cliente; si se detiene a descargar en Puerto Nariño, **recalcula automáticamente** el tiempo restante de las siguientes paradas.
- Ajuste por tonelaje: si va muy cargado, agrega horas extra.

---

### 4.16 Notificación de Aproximación al Muelle (Geofencing)

**Descripción.** Resuelve el dolor de cabeza más grande del Amazonas: gente perdiendo horas en el muelle bajo el sol o la lluvia porque el barco se retrasó, o mercancía botada en el puerto porque el cliente no llegó a tiempo.

**Implementación técnica.**
1. **Geocerca:** en el panel de control se dibuja un círculo virtual invisible (**radio de 2 o 3 km**; el valor consolidado en las especificaciones finales es **2 km**) alrededor del muelle de Leticia, de Tarapacá y de La Chorrera.
2. **Disparador (trigger):** en el milisegundo en que las coordenadas del barco cruzan la línea virtual, el servidor activa la alerta.
3. **Notificación push con sonido especial:**
   > «¡Moti Alerta! 🚢 El barco [Nombre de la Embarcación] está a 15 minutos del muelle. Acércate a recibir tu mercancía. Código de retiro: #4582».

**Notificación DOBLE y simultánea (modelo triangular):**
- **Al Destinatario (Usuario 2):**
  > «🚢 ¡Moti Alerta! El barco [Nombre de la Lancha] está a 15 minutos del muelle de Tarapacá. Acércate a la orilla con tu celular para recibir tus 20 cajas. Ten listo tu código de retiro seguro».
- **Al Remitente (Usuario 1, en Leticia):**
  > «🚢 Tu envío está por llegar. El barco [Nombre de la Lancha] está aproximándose al muelle de Tarapacá para entregar las 20 cajas a [Nombre del Destinatario]».

**Beneficios comerciales documentados.**
- Evita aglomeraciones y robos: los clientes bajan a la orilla justo cuando la embarcación atraca.
- Ahorro de tiempo para el capitán: desembarque inmediato, el barco sigue su ruta sin retrasos.
- Permite cobrar un servicio "Premium" a las empresas de encomiendas por ofrecer esta alerta satelital a sus clientes.

---

### 4.17 Modelo Triangular de Tres Actores

**Descripción.** La arquitectura NO es "un cliente y un conductor". En un envío fluvial hay **tres actores simultáneos por orden**:

```
                  [ 📱 USUARIO 1: REMITENTE ] (Leticia) 🇨🇴
                                ⬇️ (Crea la orden / Paga con Nequi)
                    [ 🚢 CAPITÁN / CONDUCTOR ] (Río / Starlink)
                                ⬇️ (Actualiza GPS / Emite Alertas)
                  [ 📱 USUARIO 2: DESTINATARIO ] (Tarapacá / La Chorrera) 🇧🇷
                     (Visualiza carga / Recibe alerta / Da el Token)
```

**Interfaz del Usuario 2 (Destinatario):**
- **Módulo de visualización de carga:** tarjeta activa con el inventario exacto registrado en origen.
  > «Envío activo desde Leticia: 20 cajas pequeñas delicadas. Peso total: 150 kg. Estado: En navegación».
- **Identificación del barco y el capitán:** foto del barco, nombre de la embarcación, nombre del capitán y su calificación por estrellas.
- **Custodio del Token de Seguridad:** la pantalla del Destinatario es **la única** que muestra el código OTP de 4 dígitos. El Remitente no lo tiene; el Capitán tampoco. Esto obliga al capitán a buscar físicamente al destinatario en el muelle.

**Sincronización en base de datos.** Las tablas se amarran mediante un identificador único de viaje (**Trip_ID**). Al crear la orden, la app obliga al remitente a ingresar el número de celular del destinatario; el sistema busca ese número y le "engancha" la visualización del viaje en vivo a la pantalla de ese segundo usuario.

---

### 4.18 Token de Retiro Seguro (OTP anti-hurtos)

**Descripción.** Cuando el barco llega a un muelle con decenas de cajas, la gente se confunde o alguien vivo puede llevarse el mercado de otro.

**Flujo.**
1. Al registrarse el paquete, el sistema genera un **código de 4 dígitos** en el celular del **Destinatario**.
2. Para entregar la mercancía, el cliente debe **decirle el código al capitán/lanchero** en la orilla.
3. El capitán lo **escribe en su app**.
4. El sistema valida que coincide con el `Trip_ID`.
5. Se toma la **foto de confirmación del embarque/entrega** y la orden se cierra.
6. **Si los números no coinciden, la app bloquea la entrega y no permite cerrar el manifiesto.**

Formato en pantalla del destinatario: `[🔑 TOKEN DE RETIRO SEGURO: #7415]`

---

### 4.19 Pago en Origen / Pago en Destino (Contraentrega)

**Contexto real declarado por el fundador:** *"Acá es o paga al enviar o al recibir."* Se descartó todo modelo de crédito o cuentas a fin de mes.

**Reglas de negocio.** Al registrar una mercancía, la app **obliga a marcar una de estas dos casillas**:
- 📦 **Pago en Origen (Remitente):** el cliente entrega el efectivo o transfiere por Nequi/Pix al conductor/capitán en Leticia al despachar. La app marca el envío como **"PAGADO"**.
- 🤝 **Pago en Destino (Contraentrega):** la app marca el envío con alerta roja: **"POR COBRAR: $[Valor] COP"**. El capitán no puede soltar la caja en el muelle de Tarapacá o La Chorrera hasta que el destinatario entregue el dinero o transfiera ahí mismo.

**Ganancia de Moti:** como todo se liquida de inmediato, el sistema **descuenta automáticamente la comisión del saldo digital** del conductor/capitán.

---

### 4.20 Pago Obligatorio Antes de Iniciar la Carrera (Transporte de personas)

**Justificación del fundador:** *"A veces la gente borracha no paga, o es alguien que no quiere pagar y hacer la maldad, o pagar solo lo que ellos quieran."*

Nombre técnico: **"Bloqueo de Despacho por Verificación de Recaudo"**.

**Flujo en 3 pasos obligatorios.**
1. **Bloqueo de ruta en la app del cliente.** La app muestra la tarifa fija con recargo nocturno incluido. El cliente presiona `[Confirmar y Proceder al Pago]` y ve el método elegido.
2. **Verificación en el punto de encuentro.** La app del conductor muestra el botón "Iniciar Carrera" **deshabilitado**.
   - Efectivo: el cliente entrega los billetes **antes de subirse**; el conductor presiona `[Efectivo Recibido]`.
   - Nequi/Pix: el cliente transfiere en ese instante; el conductor verifica y presiona `[Transferencia Verificada]`.
3. **Desbloqueo del viaje y activación del GPS.** Se activa el botón verde `[Iniciar Carrera]` y se enciende el mapa de navegación offline.
   - Si el cliente se niega a pagar por adelantado, el conductor cancela con el motivo **"Usuario se niega a pagar en origen"**; el viaje se anula y vuelve a estar disponible en el mapa.

**Blindaje anti-fraude digital (pantallazos falsos).**
- **Lector de código de referencia obligatorio:** la app solicita digitar **los últimos 4 números del código de referencia** de la transacción de Nequi o Pix. El backend cruza el dato para verificar que no se reutilice un pantallazo viejo.
- **Historial de cancelaciones del cliente:** si un usuario genera solicitudes falsas repetidamente o los conductores lo cancelan de forma consecutiva por no querer pagar, el algoritmo emite una **"Alerta de Fraude"** y **bloquea el número de teléfono y el dispositivo de forma permanente**.

---

### 4.21 Cierre Express del Viaje y Calificación Cruzada

**Descripción (idea del fundador).** *"El cliente solo se baja de la moto, entrega el casco y listo; el conductor le pone viaje finalizado y ambos se califican con estrellas."*

**Flujo.**
```
[Conductor llega al destino] ➡️ [Presiona "Finalizar Viaje"] ➡️ [Cliente entrega casco y baja]
                                          ⬇️
[Pantalla de Calificación Simultánea] ⬅️ (En segundo plano: comisión + ranking)
```

1. **Interfaz del conductor:** la app detecta la llegada por coordenadas. El conductor presiona `[Finalizar Viaje]`. El estado cambia a **"Completado"** de inmediato y el conductor **regresa automáticamente al mapa de disponibilidad**.
2. **Calificación cruzada simultánea:**
   - Cliente (mientras camina): foto del conductor + selector rápido de 1 a 5 estrellas, en un solo toque.
   - Conductor (mientras guarda el casco): nombre del usuario + 1 a 5 estrellas para puntuar el comportamiento del pasajero. Si el cliente estaba en estado de embriaguez o fue problemático, lo califica bajo y afecta su ranking para futuros viajes nocturnos.

**Procesos automáticos en segundo plano:**
1. **Liquidación de la comisión:** se calcula la tarifa, se extrae el porcentaje o valor fijo de la plataforma y se descuenta del monedero digital del conductor.
2. **Actualización del algoritmo de ranking:** se recalcula el promedio de estrellas en tiempo real.
3. **Liberación geográfica:** se reindexa la posición GPS del conductor para recibir la próxima solicitud compatible por método de pago.

**Idea propuesta y no cerrada:** etiquetas de texto rápidas de un solo toque en la calificación (para el conductor: "Buen manejo", "Casco limpio"; para el cliente: "Amable", "Impuntual"). `[PENDIENTE: no se respondió]`

---

### 4.22 Sistema de Reputación por Estrellas y Ranking

**Descripción (idea del fundador).** *"Todos tienen su calificación con estrellas, puntuando a la gente para que aparezca en el primer puesto quién más va a aparecer."*

Nombre técnico: **Algoritmo de Priorización por Calificación / "Moti-Premium"**. Aplica a **cargadores, mototaxistas, motocargas y capitanes**.

**Criterios del Top 1 de la lista:**
- Mayor puntuación en estrellas (ej. 4.9 o 5.0).
- Mayor número de servicios completados con éxito.
- Menor tasa de quejas o cancelaciones.

**Filtro de seguridad "Alerta Roja":**
- Si recibe **menos de 3.5 estrellas** o reportes de mercancía golpeada, el algoritmo **lo esconde al final de la lista**.
- Si se repite, **bloquea la cuenta automáticamente** de forma temporal o permanente por violar las normas de calidad.

**Incentivo comercial:** aparecer primero significa más ofertas y más dinero, lo que obliga a competir sanamente por dar el mejor trato a la carga.

**Doble vía y transparencia:** los conductores también ven la calificación de los clientes y deciden libremente si aceptan conectarse. El cliente puede presionar sobre el perfil del trabajador y **ver comentarios reales y promedio de estrellas** de otros comerciantes de Leticia.

**Idea relacionada propuesta (Idea 10 — "Clasificación por Estrellas Turísticas"):** si un motocarro acumula muchas calificaciones altas de turistas extranjeros, la app le da prioridad automática cuando un nuevo extranjero pida servicio desde el aeropuerto u hoteles principales. `[PENDIENTE: no se respondió]`

---

### 4.23 Moti-Tasa (Conversión COP / BRL)

**Corrección clave del fundador:** *"Hay muchas casas de cambio en Leticia y todas manejan diferentes precios... en un lado el real está a 6.50 y en otra tienda lo reciben a 6.00."* En Leticia y Tabatinga **la TRM oficial no manda**; manda el comercio informal, las casas de cambio locales y el acuerdo en el mostrador. Una tasa automática de internet dejaría a los mototaxistas y lancheros perdiendo dinero o rechazando viajes.

**Solución base — Tasa Manual Controlada por el Administrador:**
- **Tasa del día configurable:** cada mañana el administrador revisa cómo se mueve el Real en el centro de Leticia y escribe la tasa en el panel de Moti (ej. *"Hoy el Real se recibe a 6.20"*).
- **Margen de protección para el conductor:** si en la calle el Real se recibe a 6.20, se puede configurar la app para que los viajes se calculen a 6.00, de modo que el conductor no salga perdiendo al cambiarla.
- **Flexibilidad de pago directo:** aviso en pantalla: *«Precios de referencia. El pago final se pacta directamente con el conductor según la tasa local aceptada»*.

**Opciones de automatización evaluadas:**
- **Opción 1 — Lectura digital de casas de cambio (Web Scraping).** Un bot entra automáticamente cada mañana a las **7:00 AM** a los sitios web, estados de Facebook o canales de WhatsApp de las principales casas de cambio de Leticia, lee el texto (ej. *"Compra: 6.20 - Venta: 6.50"*), extrae el número y actualiza el servidor. (La más exacta.)
- **Opción 2 — Tarifa Colaborativa (estilo DiDi).** Los primeros **10 mototaxistas o capitanes** que se conecten reportan a cómo están recibiendo el Real (ej. 6.10, 6.20, 6.15). El sistema **descarta los extremos, promedia** y fija la tasa del día (ej. 6.15).
- **Opción 3 — Margen de descuento fijo sobre la TRM.** Se conecta a la API financiera oficial y se le **resta automáticamente un margen fijo del 5% u 8%** (lo que cobran tiendas y casas de cambio por intermediación). Si la TRM dice 6.50, la app muestra 6.10. (La más segura, funciona los 365 días.)

`[PENDIENTE: el fundador no eligió explícitamente cuál de las 3 opciones de automatización queda. En las especificaciones finales se consolidó como "tasa manual del administrador o promedio automático de los conductores", es decir Opción 2 + manual.]`

**Visualización dual obligatoria.** Todas las tarifas se muestran en las dos monedas:
```
Tarifa: $12.000 COP (~ 16.50 BRL)
Banner de cabecera: 1.00 BRL = $620.00 COP
```

**Descartado:** conversor conectado a APIs públicas de tipo de cambio (ExchangeRate-API, Open Exchange Rates) como fuente única, y la calculadora libre de divisas para el usuario. También se descartó la **billetera virtual compartida ("Moti-Monedero")**; el fundador aclaró: *"no, solo se hace conversión de moneda dentro de la app, saber cuánto es en reais a pesos o viceversa"*.

---

### 4.24 Métodos de Pago (definición cerrada)

**Decisión textual del fundador:** *"Los únicos métodos de pago van a ser efectivo o Nequi llave, Bre-B para Colombia; y para Brasil Pix y efectivo."*

**Colombia (Leticia y corregimientos fluviales):**
- 🔘 **Efectivo (COP).** El flujo finaliza cuando el conductor o capitán confirma el recaudo físico.
- 🔘 **Nequi / llave Bre-B.** La app muestra el número de celular del conductor/capitán o un botón "Copiar Número". Al finalizar, el software exige al conductor tomar captura del comprobante o validar el número de referencia para cerrar el manifiesto.
- 🔘 **Nequi Push** (ver 4.25).

**Brasil (Tabatinga):**
- 🔘 **Efectivo (BRL).**
- 🔘 **Pix.** El software carga la **Llave Pix (Chave Pix)** del conductor brasileño o genera un código estático **"Copia e Cola"**. El cliente transfiere desde su banca móvil y el conductor confirma la recepción para liberar el servicio.

**Eliminados del alcance:** pasarelas de tarjetas de crédito internacionales, contratos con intermediarios complejos, enrutamiento dinámico multi-pasarela (Mercado Pago Brasil / Wompi / PayU como pasarelas de checkout). Beneficio: sistema más ligero, seguro, económico y rápido de programar, sin comisiones de pasarelas de terceros.

---

### 4.25 Nequi Push (pago con notificación) — inspirado en Temu

**Descripción (idea del fundador).** *"Como en Temu: uno va a pagar y en el Nequi tiene que darle en aceptar para enviar la plata."*

Nombre oficial: **API de Pagos con Notificación Push de Nequi**. Se integra vía el portal nativo **Nequi Conecta** o pasarelas aliadas (**Wompi Colombia**).

**Flujo de comunicación:**
```
[Moti Cliente: Confirma número] ➡️ [Backend Moti: Lanza petición HTTP POST] ➡️ [Servidor Nequi: Genera Alerta Interna]
                                                                                          ⬇️
[Viaje Desbloqueado para Conductor] ⬅️ [Moti Webhook: Recibe Token Exitoso] ⬅️ [Cliente: Abre Nequi y presiona "Aceptar"]
```

**Paso A — Captura del identificador.** El cliente elige la categoría (Persona, Motocarga o Cargador) y en la pantalla de pago selecciona **Nequi Push**. El software autocompleta el campo con el número con el que se registró en Moti, o permite digitar uno nuevo.

**Paso B — Disparador del cobro (trigger).** Al presionar "Solicitar Servicio", el backend hace una petición cifrada a la API de Nequi con **tres variables obligatorias**:
- `phone_number` — número celular del cliente.
- `amount_local` — valor exacto del flete o carrera con recargos incluidos.
- `merchant_payment_code` — identificador único del viaje generado por Moti.

**Paso C — Autorización del usuario.** Llega notificación push. Si el usuario la pierde, entra a Nequi → icono de la campana (Centro de Notificaciones):
> «Moti te solicita un pago por valor de: $12.000 COP. ¿Deseas autorizar el débito de tu saldo?»

El cliente digita su clave o usa huella/rostro y presiona `[Aceptar]`.

**Control de tiempos:**
- **Ventana de espera de 10 minutos (Timeout).** Por especificación de la red bancaria de Nequi, los pagos push tienen vigencia máxima de 10 minutos. Moti configura un **reloj en cuenta regresiva visible** en la pantalla del cliente y del conductor. Si no se aprueba, la API cancela el proceso automáticamente y el viaje se anula liberando al conductor.
- **Confirmación inmediata por Webhook.** Al presionar "Aceptar", el banco envía un webhook en segundo plano; el estado del viaje cambia a **"Pagado"** al instante y al conductor le vibra el celular: `[Pago Recibido Exitosamente - Inicie la Marcha]`.

**Equivalente en Brasil:** APIs de **Cobro Inmediato Pix con Código QR Dinámico**, que operan de forma idéntica en el banco central brasileño. `[PENDIENTE: se ofreció evaluarlo y no se respondió explícitamente; la interfaz final sí menciona "Pix QR"]`

---

### 4.26 Billetera Interna Autosustentable y Retiros 24/7 ⛔ **ANULADO — VER SECCIÓN 22**

> **Toda esta sección quedó sin efecto.** El modelo de recaudo centralizado, el
> abono automático al monedero del conductor y los retiros 24/7 **se eliminan**:
> partían de que el dinero del cliente entraba a la cuenta de Moti, cosa que el
> fundador descartó expresamente. El modelo vigente —**saldo prepago que el
> capitán recarga con dinero real**— está en la **Sección 22**. El texto de abajo
> se conserva solo como registro histórico.

**Modelo inicial planteado (prepago).** El conductor debía recargar previamente un "saldo de trabajo" transfiriendo a una cuenta central de Nequi o Pix; el sistema descontaba la comisión al completar el servicio; si el monedero llegaba a cero o negativo, el backend lo pausaba automáticamente.

**Evolución decidida por el fundador:** *"Que le llegue a la cartera de la app al conductor; así no tiene que estar recargando a cada rato, y más bien cuando él quiera retira o transfiere el saldo a una cuenta."*

Nombre técnico: **Modelo de Recaudo Centralizado con Billetera Interna Activa**.

**Escenario A — El cliente paga con Nequi Push o Pix QR:**
1. El cliente paga digitalmente (ej. $15.000 COP).
2. El dinero real entra a la **cuenta bancaria centralizada de Moti S.A.S.**
3. El software calcula la comisión (ej. 10% = $1.500 COP) y la retiene en la cuenta de la empresa.
4. Los **$13.500 COP restantes se abonan de inmediato como "Crédito Digital Operativo"** en la billetera interna del conductor.
5. El conductor ve el saldo al segundo y sigue trabajando sin recargar.

**Escenario B — El cliente paga en efectivo (control de saldos cruzados):**
1. El conductor recibe el 100% del dinero físico.
2. Como Moti no toca el efectivo, el software hace un **cruce de saldos interno**: resta la comisión ($1.500 COP) del saldo acumulado que el conductor ya tenía en su billetera por viajes digitales anteriores.
3. Si el saldo digital baja demasiado por recibir mucho efectivo, se compensa con la cuenta central. **El conductor solo tendrá que recargar si pasa largos periodos recibiendo exclusivamente efectivo sin un solo viaje digital.**

**Módulo de Retiros ("Moti-Cashout"):**
- **Pantalla de balance:** saldo total acumulado con historial limpio: fecha, hora, tipo de viaje (personas, carga, conector) y método de pago de cada cliente.
- **Cuenta destino fija:** en Colombia su número de Nequi; en Brasil su Llave Pix.
- **Retiros 24/7 bajo demanda.** El conductor puede presionar `[Retirar Saldo]` **cualquier día y a cualquier hora** (ej. domingo a las 2:00 AM). Si supera el monto mínimo, el retiro se procesa en segundos.

```
[Conductor presiona "Retirar" a las 2:00 AM] ➡️ [Backend: Valida Monto Mínimo]
                                                          ⬇️ (Si cumple)
[Dinero llega al Nequi/Pix del chofer] ⬅️ [API Bancaria procesa en segundos]
```

- **Monto mínimo (umbral técnico invisible):** **$20.000 COP / 30 BRL**. Razón: las pasarelas bancarias cobran centavos por transferencia; retirar de a $2.000 COP haría perder dinero al sistema.
- **Límite de transacciones:** **máximo una o dos transacciones automáticas cada 24 horas**, para evitar desgaste del servidor y micro-comisiones bancarias repetitivas.
- **Bloqueo anti-fraude de cuentas:** solo se transfiere a la cuenta de Nequi o Pix **registrada y validada al inicio**. No se puede cambiar el número de retiro de un momento a otro. Protege si le roban el celular al conductor.
- **Control de saldo de seguridad en la nube:** la cuenta central de la empresa debe mantener un fondo de reserva. Si no alcanza para cubrir un retiro, el backend **pausa temporalmente el botón** y notifica: *«Sistema de transferencias en mantenimiento preventivo. Tu saldo está seguro y la opción se reactivará en las próximas horas»*.
- **Indicador de estado en tiempo real:** `[Procesando con el Banco]` ➡️ `[Dinero Despachado]` ➡️ `[Transferencia Exitosa]`.

**Modalidades de procesamiento de payouts evaluadas:**
- **Automatizada (por API):** dispersión masiva en horario fijo (ej. todos los días a las 6:00 PM o los viernes a las 4:00 PM), con reporte automático al correo del dueño: *«Moti completó con éxito el pago automático de la semana a 150 conductores»*.
- **Semi-automática:** el sistema genera un archivo plano con montos y cuentas; el dueño lo sube al portal bancario empresarial y autoriza en un clic.
- **DECISIÓN FINAL:** **retiro inmediato 24/7 bajo demanda por API**, no por ciclo semanal.

**Sistema de "Cero Soporte Humano" (autosuficiencia del operador):**
1. **Validador de llaves bancarias:** al registrar Nequi o Pix, la app hace una **micro-transacción invisible de prueba**. Si el número está mal digitado o la cuenta inactiva, bloquea el registro al instante e indica cómo corregirlo.
2. **Historial de conciliación visual:** pantallas de finanzas tan claras y gráficas que eliminan las llamadas de soporte.
3. **Bot de resolución de errores de transacción:** si una transferencia falla por caída del banco, el backend detecta el error de la API, **devuelve los fondos a la cartera interna** y notifica: *«Transferencia bancaria fallida por congestión de la red. Tu saldo ha sido protegido y reingresado a tu billetera Moti. Se reintentará automáticamente en 12 horas»*.

---

### 4.27 Perfilamiento Dinámico de Métodos de Pago (idea del fundador)

**Descripción.** *"Si yo soy colombiano pongo mis datos y los métodos de pago que recibo, ejemplo solo efectivo o transferencias, y qué tipo de transferencia, como llave o Nequi."*

Nombre técnico: **Perfilamiento Dinámico Basado en Preferencias del Operador**.

**Flujo de registro del prestador (Conductor / Capitán / Cargador):**
1. **Nacionalidad operativa:** selecciona si su operación base es **Colombia** o **Brasil**.
2. **Métodos de recaudo habilitados** (casillas de selección múltiple según territorio):
   - `[✓] Efectivo (Pesos Colombianos - COP)`
   - `[✓] Efectivo (Reales Brasileños - BRL)`
   - `[✓] Nequi` — requiere ingresar su número de celular obligatorio.
   - `[✓] Pix` — requiere ingresar el **tipo de llave** (CPF, Teléfono, Email o Llave Aleatoria) y el **texto de la llave**.
3. Las preferencias quedan amarradas al **ID único del conductor** en la base de datos relacional.

**Filtro del algoritmo de emparejamiento (Match Inteligente):**
```
[Cliente solicita servicio] ➡️ [Selecciona método de pago: ej. Nequi]
                                      ⬇️
[El Backend escanea el mapa] ➡️ [Filtra conductores en el radio cercano]
                                      ⬇️
[Filtro de Compatibilidad]   ➡️ [Descarta conductores que NO reciben Nequi]
                                      ⬇️
[Resultado en Pantalla]      ➡️ [Muestra solo los compatibles ordenados por estrellas]
```

**Ejemplo:** un turista brasileño en Tabatinga que quiere pagar solo con Pix no verá conductores colombianos que solo manejan efectivo o Nequi.

**Ventajas documentadas:**
- **Cero fricción en el destino:** evita el *"No, yo no tengo Pix, solo efectivo"* al terminar el viaje.
- **Inclusión de trabajadores independientes:** un mototaxista sin cuenta en Brasil o Colombia puede trabajar seleccionando solo "Efectivo"; el sistema no lo excluye, solo lo asigna a clientes que pagan con billetes.
- **Transparencia total:** en la pantalla de confirmación el cliente ve los datos de transferencia del conductor asignado (ej. *"Transfiere a Nequi: 312XXX-XXXX"*).

**Pregunta abierta:** si el usuario cliente al registrarse debe declarar también qué monedas tiene físicamente disponibles (COP o BRL) para refinar el filtro, o si elige el método libremente en cada viaje. `[PENDIENTE: no se respondió]`

---

### 4.28 Política de Cancelación

**Descartado por decisión explícita del fundador:** *"No, la penalización para el cliente no."* No se generan deudas automáticas ni saldos en mora.

*(El modelo descartado era: cancelación después de 5 minutos ⇒ deuda automática de ej. $5.000 COP cobrada en el siguiente uso vía Nequi Push y abonada al conductor afectado.)*

**Solución adoptada — Reasignación Express de Proximidad:**
1. **Liberación instantánea del operador:** al presionar "Cancelar", la motocarga y el ayudante quedan disponibles de inmediato en el mapa.
2. **Prioridad absoluta de cercanía:** el algoritmo detecta la posición GPS actual de esa motocarga (que ya se desplazó) y, si otro comerciante solicita un servicio en ese radio, **le da prioridad número uno** por encima de cualquier otro vehículo.
3. **Control de cancelaciones repetitivas (filtro anti-sabotaje):** si un cliente cancela **3 veces seguidas en el mismo día**, el sistema **no le cobra dinero** pero **suspende temporalmente su cuenta por unas horas**.

---

### 4.29 Cancelación por Lluvia con Validación Climática ("Moti-Clima")

**Origen.** El fundador señaló que una cancelación puede ser legítima: *"Puede que empezó a llover y tuvo que cancelar porque las cajas no se pueden mojar."* Y añadió el riesgo: *"Si está a 30 grados con un solazo, no sería justo que cancele por esa opción."*

**Flujo.**
1. Al cancelar, la app muestra opciones reales de la calle, entre ellas: `[⛈️ Cancelar por Lluvia / Proteger Mercancía]`.
2. Aparece pantalla de carga: *"Verificando condiciones climáticas por satélite en tu ubicación..."*.
3. **Validación Climatológica por Geolocalización en Tiempo Real:**
   - **Paso 1:** el sistema toma las coordenadas exactas (lat/long) del celular del cliente o de la motocarga.
   - **Paso 2:** el servidor consulta en segundo plano una API meteorológica (**OpenWeatherMap, Weatherstack o la API de Google Weather**) preguntando el estado del cielo y el porcentaje de precipitación en esas coordenadas.
   - **Paso 3:** compara la respuesta con la decisión del cliente.

**Escenario A — Lluvia real confirmada.** Si la API reporta tormenta, lluvia ligera o **probabilidad de precipitación superior al 40%**:
- Cancelación **gratuita y válida**.
- **Cero penalizaciones**, no se generan deudas, no se afecta el historial ni las estrellas del cliente.
- Se activa el **"Moti-Refugio"** para el conductor y el ayudante:
  - **Congelación de posición:** se mantienen activos en el punto exacto donde los agarró la lluvia (bajo techo o estación de servicio).
  - **Prioridad post-tormenta:** la orden se guarda en una **"Lista de Espera por Clima"**. Apenas escampe, llega notificación push al comerciante: *«¡Ya escampó! ¿Deseas reanudar tu envío al muelle?»*. Si acepta, el sistema le asigna el viaje **con prioridad número uno a esa misma motocarga** que ya estaba cerca.

**Escenario B — Sol y fraude detectado.** Si la API reporta cielo despejado, sol y temperatura alta (ej. 30 grados):
- La app **bloquea la cancelación gratuita** y despliega:
  > «⚠️ Validación de Clima: Nuestros sistemas reportan cielo despejado en tu ubicación actual. La cancelación por lluvia no está disponible en este momento. Si deseas cancelar el servicio por otra razón, se aplicará el desvío de prioridad estándar hacia tu cuenta».
  >
  > (Variante en la especificación de interfaz: *"Validación de clima fallida: Cielo despejado reportado. Elige otro motivo de cancelación estándar"*.)

---

### 4.30 Soberanía de Placas ("la ley invisible")

**Regla real declarada por el fundador:** *"Ninguna moto o motocarro con placa colombiana puede recoger pasajeros en Brasil, y viceversa."* Es un acuerdo social estricto entre los gremios de mototaxistas de Leticia y Tabatinga para proteger el trabajo local y evitar conflictos territoriales.

**Implementación — Filtro geográfico infranqueable basado en la nacionalidad de la placa registrada:**
- **Cliente pide viaje en Leticia (Colombia):** el backend escanea el mapa y **solo envía la alerta a conductores con placa colombiana**. Las motos brasileñas físicamente presentes en Leticia quedan **invisibles** para ese cliente.
- **Cliente pide viaje en Tabatinga (Brasil):** **solo se asignan motos con placa brasileña**; se bloquea cualquier intento de una placa colombiana de captar usuarios en territorio extranjero.
- **Cruce de frontera:** un mototaxista colombiano **puede dejar un pasajero en Tabatinga si el viaje inició en Leticia**. Una vez lo deja, **la app bloquea automáticamente su radar de solicitudes**. Debe **regresar con la moto vacía a Leticia** para volver a ver clientes en su pantalla.

**Aviso de cruce internacional (viaje transfronterizo autorizado):**
> «⚠️ Este viaje cruza a territorio brasileño. Asegúrate de llevar tu casco reglamentario y tus documentos de identidad al día para evitar contratiempos con las autoridades de Tabatinga».

**Cierre de tarifa dual:** la app calcula la carrera en COP al salir; al cruzar la línea de frontera actualiza el viaje aplicando la Moti-Tasa para que en destino el cliente pueda pagar en Reales (Pix o efectivo) de forma exacta, sin que el conductor pierda un centavo por el cambio.

---

### 4.31 Segmentación Jurisdiccional por Geocerca (Colombia vs. Brasil)

**Contexto legal.** En **Brasil el mototaxismo es una actividad regulada y 100% legal** (bajo la **Ley Federal 12.009 de 2009**). En **Colombia sigue bajo el marco de la informalidad**, aunque de todas maneras la gente lo hace y es un trabajo honesto.

**Comportamiento del software según el lado de la frontera:**

**🇧🇷 Lado Brasil (Tabatinga) — operación 100% legal:**
- La app habilita campos de registro para **CNH** (licencia brasileña) y la **placa de la moto con el color reglamentario de Tabatinga**.
- El contrato digital que acepta el usuario se ampara bajo la **ley de transporte de Brasil**. Moti se presenta con total libertad comercial como plataforma de conexión para un servicio público autorizado.

**🇨🇴 Lado Colombia (Leticia) — intermediación pura:**
- Al cruzar la Avenida Internacional hacia Leticia, el backend **cambia automáticamente el marco contractual** al modelo de **"Contrato de Arrendamiento de Vehículo con Conductor" + "Licencia de Uso de Software"**.
- Blindaje ante autoridades: el software demuestra que Moti **no habilita transporte público informal**, sino que **licencia un código** para que dos ciudadanos privados celebren un contrato de alquiler privado de la moto por unos minutos.

---

### 4.32 Módulo "Moti-Alerta" — Asistencia Vial y Señalización

**Origen (idea del fundador).** *"Que ellos indiquen dentro de la aplicación policía de tránsito, semáforo, accidente... y otro aspecto: los PARES que existan, que a veces los árboles tapan la señalización y es peligroso, porque las calles en Brasil son diferentes; eso ayudaría a alguien nuevo que no conoce Brasil, le indica dónde están los pares, las calles de una sola dirección y las de doble vía."*

**A. Capa de señalización estática fija (PARES e intersecciones).** Los programadores inyectan en los mapas locales en caché una capa de datos fijos con la señalización real (incluye sentido de las vías: una sola vía / doble vía).
- Alerta al aproximarse a **50 metros** de una intersección peligrosa o un PARE tapado por vegetación:
  > «⚠️ ¡Moti Alerta! PARE en 50 metros. Cruce peligroso / Vía de un solo sentido»

**B. Capa dinámica colaborativa.** Botón lateral flotante `[🚨 Reportar Evento]`, marcable con un solo toque sin distraerse:
- 👮‍♂️ **Policía de Tránsito / Retén** — alerta al gremio sobre controles de documentación.
- 🚦 **Semáforo dañado** — evita trancones y previene choques en avenidas principales.
- 💥 **Accidente en la vía** — desvía automáticamente las rutas de otras motocargas en camino al muelle para que la carga llegue a tiempo al barco.

**C. Algoritmo de caducidad (limpieza automática del mapa).**
- Cada reporte dinámico dura activo **exactamente 60 minutos**.
- Si **otros dos conductores** pasan por el mismo punto y presionan `[✓ Sigue ahí]`, el icono se mantiene **una hora más**.
- De lo contrario, el sistema lo borra solo.

---

### 4.33 Diseño de la Alerta de PARE (visual, sonora y háptica)

**Requerimiento del fundador:** *"Con sonido, pero que también se pueda mutear; pero que visualmente se vea como una alerta del PARE, así como rojo, para indicarle el PARE."*

**1. Visual (obligatorio, no se puede desactivar):**
- **Efecto Pantalla Flash Roja (Overlay):** el borde completo de la pantalla parpadea en **rojo brillante `#FF0000`** de forma intermitente, para captar la atención por visión periférica aunque el conductor mire la carretera.
- **Icono flotante gigante:** disco de "PARE / PARE" tridimensional, titilando en el centro, con distancia restante:
  ```
  [🛑 PARE A 30 METROS - VÍA PELIGROSA]
  ```
- **Sentido de la vía:** si la calle a cruzar es de una sola vía, se pinta una **flecha gigante** sobre el mapa indicando la dirección correcta para no meterse en contravía.

**2. Sonido y botón de mute:**
- Por defecto: **pitido secuencial de advertencia estilo radar**, por altavoz del celular o audífonos Bluetooth del casco.
- **Botón flotante de mute permanente en la esquina superior derecha del mapa:** `[🔊]` ⇄ `[🔇]`.
- Al mutear se desactivan **por completo** las alertas de voz y pitidos de PARES, semáforos y retenes.
- **La seguridad se mantiene:** aunque el sonido esté apagado, **el parpadeo rojo y el icono gigante siguen apareciendo obligatoriamente**.

**3. Vibración háptica:** en las motos el ruido del motor o el viento impiden escuchar. Al acercarse al PARE oculto, el celular vibra con **tres pulsaciones largas y continuas**, perceptibles en el bolsillo de la chaqueta o en el soporte del manubrio.

---

### 4.34 Modo Offline y Sincronización Diferida

**Problema del "apagón fronterizo".** Al cruzar la Avenida Internacional entre Leticia y Tabatinga, las antenas de Claro o Movistar Colombia pierden fuerza y el celular intenta conectarse a redes brasileñas (Vivo, TIM). En ese limbo las apps normales se quedan "pensando" y bloquean el viaje.

**A. Mapas urbanos en caché (Offline).**
- Se guardan en la memoria caché del teléfono **los vectores de las calles principales de Leticia y Tabatinga**.
- Peso adicional aproximado: **5 MB**.
- Permite que la moto siga su curso y registre el viaje incluso en zona de sombra celular, y sirve para zonas rurales en las afueras de Leticia donde la señal desaparece.

**B. "Módulo Transfronterizo Sin Costuras" / "Efecto Puente".**
- **Sincronización dual automática:** la app guarda los datos del viaje (origen y destino) en la memoria interna del celular del conductor en tiempo real.
- Si la señal se cae al cruzar a Tabatinga, **la app sigue registrando el recorrido usando el GPS puro del teléfono** (funciona por satélites, no necesita internet).
- Cuando el conductor recupera señal (roaming en Brasil o regreso a Leticia), la app envía los datos acumulados al servidor y **cierra el viaje perfectamente sin cobrar de más ni perder el registro**.

**C. Almacenamiento local y Background Sync.**
- Base de datos embebida en el teléfono: **SQLite** o **Hive**.
- Cuando no hay señal, el celular escribe localmente con la etiqueta `status = "PENDING_SYNC"`.
- Un **Network Listener** detecta conectividad (Wi-Fi Starlink a bordo o datos móviles en Leticia) y dispara un hilo invisible que inyecta los datos al servidor y cambia la etiqueta a `status = "SYNCED"`.
- El conductor nunca nota el proceso y las cuentas permanecen exactas.

**D. "Moti-Offline" para el cliente en el muelle (Idea 1).** La app guarda en memoria el último manifiesto y la última ubicación conocida del barco. Si el cliente abre la app sin internet, ve un mapa simplificado con texto:
> *"Último reporte hace 20 minutos: El barco estaba a 15 km de tu muelle"*.

Así el cliente no queda a ciegas en la selva.

---

### 4.35 Registro Seguro del Destinatario (Anti-inyección de datos)

**Alerta del fundador:** *"Si no está registrado en la aplicación es mejor evitar una inyección de datos, o si el número de celular tiene alguna desviación de mensajes; hay que cuidar los datos de la plataforma."*

**Riesgos identificados (documentados):**
1. **Inyección de datos y explotación de APIs (SMS Spoofing / Flooding):** usuarios maliciosos podrían ingresar miles de números falsos, obligando al servidor a enviar mensajes masivos → facturas gigantescas con el proveedor de SMS y saturación de la base de datos.
2. **Desviación de mensajes (intercepción):** si el remitente digita mal un dígito, el Token de seguridad y la información de la carga llegarían al celular de un desconocido → facilita un hurto en destino.
3. **Sanciones de la SIC (Superintendencia de Industria y Comercio):** enviar mensajes a un ciudadano que no ha firmado la política de tratamiento de datos genera multas severas.

**DESCARTADO:** que el servidor de Moti envíe SMS automáticos a personas no registradas.

**Solución intermedia evaluada (Enlace de Invitación Criptográfico):** generar un hash seguro y que **el propio Remitente** envíe la invitación desde SU celular por WhatsApp, de modo que el mensaje salga de su número personal y no de los servidores de Moti.

**DECISIÓN FINAL DEL FUNDADOR:** *"Más bien que le envíe la aplicación por WhatsApp, el enlace de descarga."* ⇒ Se usa la **API Oficial de WhatsApp Business (Meta)** vinculada al servidor, con tres filtros:

```
[Remitente crea envío] ➡️ [Paga con Nequi Push exitosamente] ➡️ [El sistema valida el pago real]
                                                                          ⬇️ (Solo si el pago es real)
[Destinatario recibe WhatsApp] ⬅️ [API de WhatsApp Business] ⬅️ [Servidor de Moti envía plantilla cifrada]
```

**Filtro 1 — El disparador es el pago real (anti-inyección).** El servidor **tiene prohibido** enviar mensajes por el solo hecho de que alguien escriba un número. La API de WhatsApp **solo se activa después de verificar que el pago por Nequi Push o la recarga fue exitosa**. Un atacante no gastará dinero real en carreras falsas solo para saturar el sistema ⇒ riesgo reducido a cero.

**Filtro 2 — Plantillas homologadas por Meta (HSM — Highly Structured Message).** WhatsApp prohíbe texto libre o enlaces sospechosos desde cuentas empresariales. Plantilla aprobada:
> «Hola, [Nombre_Destinatario]. Un usuario de Moti te ha registrado para recibir un envío fluvial desde Leticia. Para cuidar tus datos y visualizar la ruta del barco por satélite, debes registrar tu número aceptando los términos legales. Descarga la app oficial aquí: [Enlace_Seguro_Google_Play]».

**Filtro 3 — Aislamiento de datos (Sandbox temporal).** El número del destinatario no registrado **no entra a la base de datos principal**; se guarda en una **tabla temporal de "Espera de Registro"**. Si en **48 horas** la persona no descarga la app y valida su identidad con su propio OTP, **el sistema borra ese número automáticamente**.

**Validación obligatoria en destino (registro limpio):**
1. Ingresa su número de celular.
2. El sistema valida su identidad mediante un **código OTP**.
3. **Acepta explícitamente los Términos y Condiciones y la Política de Privacidad de Datos.**
4. Solo entonces el backend hace el cruce interno y le activa la visualización del barco y sus cajas.
5. Si nunca se registra, **el viaje se mantiene bloqueado en origen** y el Remitente deberá gestionar el retiro con el conductor por métodos tradicionales bajo su propia responsabilidad.

**Transparencia contra errores de digitación:**
- Si el destinatario ya está registrado, la app muestra al remitente **las iniciales sombreadas**: *"¿El destinatario es J** M*****?"*.
- Si no está registrado, la app pide **confirmar el número dos veces**: *"Por favor, verifique el número del destinatario. A este celular le llegará el código SMS con el Token obligatorio para poder retirar la mercancía en el muelle"*.

**Aviso al remitente en pantalla de registro:**
> *"Destinatario no registrado. Al confirmar el pago real, Moti le enviará un enlace de invitación oficial por la API de WhatsApp Business para habilitar su app de forma segura"*.

---

### 4.36 Bucle de Crecimiento Viral Orgánico

**Descripción (idea del fundador).** *"Así más usuarios se enteran de la app y empiezan a enviar sus pedidos por medio de la app."* Cada envío convierte al destinatario en un usuario nuevo, sin gastar en publicidad.

**Módulo "Enviar un Pedido Fluvial" — flujo de 3 pasos:**
1. **Destino de la carga:** muelle o corregimiento (Tarapacá, La Chorrera, Puerto Nariño).
2. **Datos del Destinatario (Usuario 2):** campo obligatorio *"¿Quién recibe la mercancía en destino?"* → Nombre completo + **número de teléfono celular (campo clave)**.
3. **Inventario y negociación:** cantidad de cajas o toneladas, cotización con el cargador, elección del barco por día de salida, pago seguro por Nequi Push o Pix.

**Escenario A — Destinatario NO registrado:** se dispara la invitación por WhatsApp Business API (ver 4.35). Resultado: la persona en Tarapacá o La Chorrera descarga la app de inmediato por la necesidad real de ver dónde viene su mercancía.

**Escenario B — Destinatario YA es usuario:** notificación push nativa:
> «🔔 ¡Envío en camino! Tienes una nueva carga asignada a tu número por parte de [Nombre del Remitente]. Abre Moti para visualizar los detalles de la mercancía, el nombre del capitán y el mapa de navegación satelital».

---

### 4.37 Modo Turista / Visitante Temporal

**Requerimiento del fundador:** *"Falta ahora los extranjeros que quieran utilizar la app temporalmente, tanto colombianos como extranjeros."*

**Problema.** Un turista que estará 3 o 4 días no puede pasar por un registro largo ni tiene Nequi ni Pix. Además, muchos extranjeros viajan con su chip original y **el roaming apagado**, por lo que no pueden recibir el SMS de confirmación.

**Nombre técnico:** *Registro Exprés para Transeúntes con Validación de Pasaporte o Cédula*.

**Flujo de registro exprés:**
1. El turista escanea el **QR del aeropuerto**.
2. Al abrir la app ve un botón destacado: `[✈️ Modo Turista / Visitante Temporal]`.
3. **Autenticación en un toque:** se registra vinculando directamente su **cuenta de Google o Apple ID**, o validando un **código rápido enviado a su correo electrónico** (usando el Wi-Fi del aeropuerto). **No se le exige número de teléfono local de Colombia o Brasil.**
4. **Identificación oficial:** la app le pide tomar una **foto rápida a su Pasaporte o Cédula de Extranjería/Ciudadanía**. Un algoritmo básico de reconocimiento visual extrae **nombre y nacionalidad**, creando un perfil temporal verificado **en 5 segundos**.

**Lógica de pagos para el turista:**
- **Filtro de pago exclusivo en Efectivo:** al activar el Modo Turista, la app **bloquea automáticamente Nequi y Pix** en su pantalla de pago.
- **Conversor visible para evitar "tumbazos":** tarifa fija mostrada en gran tamaño en ambas monedas.
  ```
  Tarifa sugerida Moti: $10.000 COP / 15.00 BRL
  ```
- **Asignación de conductores compatibles:** solo se alerta a conductores que marcaron que aceptan "Efectivo".
- El turista paga por adelantado en billetes según el precio exacto de la pantalla, entrega el casco al llegar al hotel y el viaje se cierra con estrellas de forma express.

**Regla de caducidad del perfil temporal (Algoritmo de Purga Autónoma):**
- Vigencia exacta: **30 días**.
- Si el perfil completa **30 días sin registrar un solo inicio de sesión desde las coordenadas de Leticia o Tabatinga**, el backend asume que el turista abandonó la región.
- De forma automática e invisible, el servidor **borra la foto del pasaporte o cédula y archiva el perfil**, manteniendo la base de datos limpia y protegida contra filtraciones.

---

### 4.38 Portal Web para Comerciantes Mayoristas ("Moti-Portal")

**Descripción (Idea 17).** Las tiendas grandes de abarrotes, depósitos y ferreterías de Leticia mandan toneladas semanalmente. Registrar 20 viajes desde un celular es incómodo.

**Funcionamiento:** portal web sencillo para computadores. El dueño de la distribuidora entra desde su oficina, **sube su manifiesto de carga masiva en Excel**, selecciona los barcos y cotiza todo en una pantalla grande **en 2 minutos**.

**Objetivo:** que las empresas grandes prefieran Moti sobre cualquier agencia tradicional.

---

### 4.39 Facturación Electrónica DIAN ⛔ **ELIMINADA — VER SECCIÓN 23**

> **Este módulo se elimina del producto.** Decisión del fundador: emitirle al
> comerciante una factura por el flete equivale a declarar que Moti vendió el
> servicio de transporte, y Moti no vende transporte. El texto de abajo se
> conserva solo como registro de lo que se descartó. Ver **Sección 23**.

**Descripción (Idea 18).** Las empresas formales necesitan legalizar sus gastos de transporte ante la DIAN. Las agencias tradicionales se demoran días o dan recibos de papel que no sirven para la contabilidad.

**Implementación:**
1. **Perfil dual de usuario (Natural vs. Empresa).** La mayoría se registra como usuario común (cédula y nombre). Botón: *"¿Eres comerciante o empresa formal?"* — si lo activan, el sistema pide **RUT** y **correo de facturación**.
2. **Disparador automático (Webhook).** Cuando el usuario-empresa confirma que su mercancía fue entregada con éxito en el muelle de destino, el backend conecta en milisegundos con un **proveedor tecnológico autorizado por la DIAN** (ejemplos citados: **Facturatech, Siigo o Alegra**, que tienen APIs muy económicas).
3. **Cero papeles.** El sistema genera el **archivo XML y el PDF legal de la DIAN** con el cobro del flete o la motocarga y lo envía al correo del cliente de inmediato.

**Ventaja competitiva:** Leticia Express no puede competir contra esa velocidad administrativa.

---

### 4.40 "Moti-Sello" — Códigos QR físicos para las cajas (Idea 19)

**Descripción.** El sistema no solo debe ser digital, debe verse físicamente en el muelle.

**Funcionamiento:** si el cliente tiene una **impresora térmica pequeña** en su negocio (o Moti compra unas baratas para las motocargas), el sistema genera un **sticker con un Código QR único por envío** que se pega a las cajas principales. Cuando el cargador o el lanchero reciben la mercancía, **apuntan con la cámara al QR** para verificar que es la caja correcta del manifiesto.

**Efecto:** da estatus de multinacional y sepulta el modelo antiguo de marcar las cajas con marcador permanente.

`[PENDIENTE: no hubo confirmación explícita del fundador sobre este módulo]`

---

### 4.41 Dashboard Web de Administración

**Descripción.** Plataforma web privada para el computador del dueño. Permite controlar el negocio sin esfuerzo.

**Componentes:**
- **Mapa en vivo** de Leticia y Tabatinga con los iconos de las motos moviéndose, construido con **Leaflet o Mapbox**, alimentado por las coordenadas de geolocalización de las motocargas y el GPS satelital de Starlink.
- **Lista de barcos navegando** por el río con sus coordenadas de Starlink.
- **Casilla de la Moti-Tasa:** entrada de datos simple para escribir el valor del Real frente al Peso, o activar el algoritmo de promedio automático callejero. Al escribirlo, el servidor **envía un paquete de datos instantáneo a las miles de apps en la calle**, actualizando el conversor de divisas de forma simultánea en segundos (vía WebSockets / base de datos reactiva).
- **Reportes financieros:** cuántas comisiones ha retenido la plataforma en el día.
- **Registro de conductores:** formulario dinámico según nacionalidad (ver 5.3).
- **Zonificación de riesgo:** dibujar en el mapa las zonas que las autoridades consideren peligrosas a altas horas de la noche. El software **bloquea automáticamente** las solicitudes que se originen o tengan destino en esos puntos durante los horarios de riesgo.
- **Geocercas dinámicas:** dibujar mapas virtuales sobre nuevas ciudades/muelles para aplicar tarifas sin tocar el código de la app.
- **Filtro de circulación / "Pico y Placa" (Idea 7):** bloquear zonas o apagar categorías de vehículos en ciertos horarios para evitar multas a los conductores. `[PENDIENTE: propuesto, no confirmado explícitamente]`

---

### 4.42 Mitigación de Hurtos (resumen consolidado)

**Para proteger al CLIENTE:**
1. **Trazabilidad satelital ininterrumpida.** Si un conductor desvía la mercancía del trayecto autorizado hacia una zona no registrada, el backend **detecta la anomalía geográfica**, emite alerta automática al panel de control y **guarda la última coordenada como prueba judicial**.
2. **Token OTP de entrega** (ver 4.18).
3. **Identificación plena de la cuadrilla.** El cliente ve **nombre completo, foto de perfil actualizada y número de cédula o CPF** del conductor de la motocarga y del líder de cargadores asignado. Elimina el anonimato.

**Para proteger al CONDUCTOR / CARGADOR:**
1. **Eliminación del efectivo como objetivo.** Al masificar Nequi Push y Pix, los conductores acumulan ganancias en la billetera digital y **no cargan fajos de billetes** en la guantera del motocarro o la cabina del barco durante la noche.
2. **Validación de identidad del cliente.** Al registrarse, el cliente debe validar su número de teléfono por **SMS** y asociar un **documento de identidad real**. Los conductores ven **antigüedad y calificación** antes de aceptar.
3. **Zonificación de riesgo excluyente** (ver 4.41).

---

### 4.43 Ideas propuestas y no resueltas (registro completo)

| # | Idea | Estado |
|---|---|---|
| Idea 2 | Seguro de Carga "Moti-Protege" — casilla opcional "Añadir seguro Moti por $5.000 COP"; si la mercancía sufre daño respaldado por fotos del manifiesto, la app responde por el valor o conecta con un fondo de garantía local | `[PENDIENTE: propuesta, sin respuesta]` — colisiona con la decisión de no responder por mercancía |
| Idea 3 | Alertas por SMS tradicional y notas de voz automatizadas para abuelos/comerciantes con celulares básicos | `[PENDIENTE]` — el SMS automático quedó restringido por ciberseguridad |
| Idea 4 | Billetera Virtual Compartida "Moti-Monedero" | **DESCARTADA** por el fundador |
| Idea 5 | "Moti-S.O.S." fluvial y terrestre — botón de pánico que envía ubicación GPS a la central y a autoridades/lanchas de rescate | `[PENDIENTE: sin respuesta]` |
| Idea 6 | Registro de embarcaciones por matrícula y nombre tradicional | Implícitamente adoptado en la interfaz |
| Idea 7 | "Pico y Placa" / filtro de circulación por zonas y horarios | `[PENDIENTE: sin respuesta]` |
| Idea 8 | Mapas offline urbanos (+5 MB) | **APROBADA** — *"claro, esa idea es buena, también la tenía en mente"* |
| Idea 9 | "Moti-Padrino" — referidos: el conductor que invita a otro recibe un día de uso gratis o un bono digital cuando el nuevo complete sus primeros 10 viajes | `[PENDIENTE: sin respuesta]` |
| Idea 10 | Clasificación por "Estrellas Turísticas" con prioridad automática | `[PENDIENTE: sin respuesta]` |
| Idea 11 | "Moti-Colectivo" — rutas frecuentes compartidas, varios usuarios dividen el costo de un motocarro | `[PENDIENTE: sin respuesta]` |
| Idea "Moti-Fiado" | Crédito local a fin de mes para tiendas y agencias | **DESCARTADA** — *"acá es o paga al enviar o al recibir"* |
| Idea 13 | Código de retiro seguro de 4 dígitos | **APROBADA** (ver 4.18) |
| Idea 14 | Aforo / límite de capacidad del viaje | **APROBADA** (ver 4.10) |
| Idea 15 | Comprobante de pesaje / foto de la báscula al momento de la entrega como respaldo legal | `[PENDIENTE: sin respuesta]` |
| Idea 16 | Botón "Carga Delicada / Frágil" | **APROBADA** (ver 4.12), con cobro extra sin definir |
| Idea 17 | "Moti-Portal" para mayoristas | **APROBADA** implícitamente (*"me gusta cómo piensa, esa es la idea, innovar"*) |
| Idea 18 | Facturación electrónica DIAN del flete | ⛔ **ELIMINADA** — facturar el flete equivale a vender transporte. Ver Sección 23 |
| Idea 19 | "Moti-Sello" QR físico en cajas | `[PENDIENTE: sin confirmación]` |
| Idea 20 | Factor "Aguacero" — tarifa dinámica por clima | **DESCARTADA** — *"el que quiera trabajar que trabaje, sea con lluvia o con sol"* |
| Idea 21 | "Mercancía Asegurada contra Humedad" — exigir carpa impermeable pagando adicional | **DESCARTADA** junto con la Idea 20 |
| Idea 22 | Filtro de "Paso Fronterizo Nocturno" — recordar documentos o asignar conductores autorizados a cruzar | `[PENDIENTE: sin respuesta directa; superado por la regla de Soberanía de Placas]` |
| Idea 23 | Categoría "Moti-Bilingüe" / Conductor Turístico con tarifa diferenciada más alta | `[PENDIENTE: sin respuesta]` |
| — | "Registro por Fases" — permitir trabajar 30 días solo con cédula y foto del vehículo, con plazo para subir SOAT y Tecnicomecánica; si no los sube, el sistema pausa la cuenta | `[PENDIENTE: sin respuesta]` |
| — | "Combo Moti" (Tierra + Río) contratado en un solo pago | Superado por el flujo integrado End-to-End (4.6) |
| — | Alianzas con las agencias de carga del muelle: venderles el panel de administración | `[PENDIENTE: sin respuesta]` |
| — | "Moti-Turismo": categoría de guía/conductor turístico certificado con inglés o portugués básico y tarifa más alta | `[PENDIENTE: sin respuesta]` |
| — | Penalización al cliente por cancelar cuando el ayudante ya cargó las cajas, para pagarle la liga | **DESCARTADA** con la política de cancelación |
| — | Etiquetas rápidas de calificación ("Buen manejo", "Casco limpio", "Amable", "Impuntual") | `[PENDIENTE: sin respuesta]` |
| — | Sistema de "Fila de Espera Virtual" / turnos por zona vs. asignación puramente geográfica | `[PENDIENTE: planteado como dilema, no resuelto]` |
| — | Canal de soporte inmediato / historial de trazabilidad como prueba legal ante decomisos aduaneros o accidentes | `[PENDIENTE: planteado como dilema, respondido solo con "somos un sistema de conexión"]` |

---

## 5. ROLES, PERMISOS Y AUTENTICACIÓN

### 5.1 Roles del sistema
| Rol | Descripción |
|---|---|
| **Usuario 1 — Remitente / Pasajero** | Crea la orden, paga, califica |
| **Usuario 2 — Destinatario** | Visualiza la carga, recibe alertas, custodia el Token OTP, entrega el código |
| **Conductor Moto** | Transporte de pasajeros |
| **Conductor Motocarro** | Pasajeros, turistas con maletas, hasta 5 cajas medianas |
| **Conductor Motocarga** | Mercancía, trasteos, acarreos; puede activar Ayudante |
| **Ayudante** | Tercero de confianza del conductor, sin vínculo con Moti |
| **Líder de Cuadrilla / Conector de Carga** | Oferta y contraoferta, ejecuta el cargue, sube foto de embarque |
| **Capitán / Lanchero** | Configura rutas, días, tarifas, aforo; gestiona manifiesto; valida Token |
| **Usuario Empresa / Comerciante formal** | Perfil con RUT y correo de facturación; acceso al Portal Web |
| **Turista temporal** | Perfil exprés con caducidad de 30 días, solo efectivo |
| **Administrador** | Dashboard web, Moti-Tasa, geocercas, zonas de riesgo, reportes |

### 5.2 Autenticación
- **Usuario estándar:** número de celular + validación **SMS/OTP** + documento de identidad real.
- **Turista temporal:** Google / Apple ID **o** código al correo electrónico + foto de pasaporte o cédula (OCR extrae nombre y nacionalidad). **Sin número local requerido.**
- **Destinatario invitado:** registro obligatorio con OTP propio + aceptación explícita de T&C y Política de Privacidad antes de habilitar la visualización del envío.
- **Aceptación de T&C:** casilla de verificación **no marcada por defecto**; el botón "Continuar" permanece bloqueado hasta marcarla manualmente. Se registra en base de datos **fecha, hora exacta y dirección IP** de la aceptación (prueba reina ante un juez).

### 5.3 Registro de operadores — formulario dinámico por nacionalidad
Muchos conductores residen en Tabatinga pero trabajan en Leticia o viceversa.

**Colombia:**
- (i) Cédula de Ciudadanía colombiana
- (ii) Licencia de conducción vigente para motocicleta (**A2**)
- (iii) **SOAT** vigente
- (iv) Certificado de **Revisión Técnico-Mecánica** vigente

**Brasil:**
- **CPF**
- **CNH** (licencia brasileña)
- Placa de la moto con el color reglamentario de Tabatinga

**Validaciones automáticas:**
- El sistema valida **fechas de vencimiento de forma independiente** mediante algoritmos específicos por tipo de documento.
- El software **bloquea automáticamente al conductor si su SOAT o Técnico-Mecánica están vencidos**.
- Verificación obligatoria (manual o automatizada) de **antecedentes penales (Policía) y fiscales (Contraloría/Procuraduría)**.
- El uso de documentación falsa o vencida ⇒ **bloqueo inmediato de la cuenta y reporte ante autoridades competentes**.

`[PENDIENTE: el fundador nunca respondió si la verificación de antecedentes será automática con IA o manual desde el panel]`

---

## 6. MODELO DE DATOS

> **Nota:** el esquema entidad-relación formal **NO se llegó a redactar** en la conversación. Quedó explícitamente como entregable pendiente. Lo que sigue son las entidades, campos y relaciones **mencionados explícitamente**.

### 6.1 Entidades y campos mencionados
- **Viaje / Orden** — `Trip_ID` (identificador único de viaje; llave que amarra a los tres actores), estado (`Completado`, `Usuario no se presentó`, `Pagado`, `PENDING_SYNC`, `SYNCED`).
- **Usuario** — ID de usuario, nombre, número de celular, documento (cédula / CPF / pasaporte), nacionalidad, antigüedad, calificación en estrellas, historial de cancelaciones, tipo de perfil (natural / empresa / turista temporal).
- **Usuario Empresa** — RUT, correo de facturación.
- **Conductor / Operador** — ID de conductor, nacionalidad operativa, tipo de vehículo, características del vehículo (estacas, platón plano, carpa), placa y su nacionalidad, documentos y fechas de vencimiento, métodos de recaudo habilitados, calificación, servicios completados, tasa de quejas.
- **Métodos de recaudo** — Efectivo COP, Efectivo BRL, Nequi (número de celular), Pix (tipo de llave: CPF / Teléfono / Email / Aleatoria + texto de la llave). **Cifrados en AES-256.**
- **Billetera / Wallet** — saldo acumulado, historial con fecha, hora, tipo de viaje, método de pago, valor bruto, comisión descontada, saldo neto.
- **Embarcación** — nombre tradicional, matrícula, foto, capitán asociado, calificación, capacidad máxima (toneladas / piezas).
- **Ruta fluvial** — origen, paradas intermedias, destino final, día y hora de salida.
- **Tarifario del capitán** — precio por kilo/arroba, por pieza pequeña, por pieza grande, por tonelada.
- **Manifiesto** — lista de ítems, cliente final (nombre + teléfono), muelle de destino, orden de entrega, etiqueta de pago (`PAGADO EN ORIGEN` / `POR COBRAR CONTRAENTREGA: $X`), marca de carga frágil (alerta amarilla).
- **Ítem de carga** — tipo de caja (categoría con volumen precalculado invisible), cantidad (multiplicador), peso bruto total, marca de frágil.
- **Token OTP de entrega** — código de 4 dígitos, asociado al `Trip_ID`, visible solo al Destinatario.
- **Bitácora GPS / Starlink** — coordenadas lat/long cada 30 segundos, velocidad promedio, última coordenada conocida.
- **Geocerca** — polígono/círculo (2 km alrededor de muelles), zonas de riesgo nocturno, línea fronteriza Colombia/Brasil.
- **Señalización estática** — coordenadas de PARES, intersecciones peligrosas, sentido de vía (una vía / doble vía).
- **Reporte vial dinámico** — tipo (policía / semáforo / accidente), coordenadas, timestamp, contador de confirmaciones, caducidad 60 min.
- **Log de la API del clima** — coordenadas consultadas, respuesta, porcentaje de precipitación, veredicto.
- **Tabla temporal "Espera de Registro"** — número del destinatario no registrado, con purga automática a las 48 horas.
- **Calificaciones** — estrellas 1–5, comentarios públicos, promedio, doble vía (cliente↔operador).
- **Aceptación de T&C** — fecha, hora exacta, dirección IP.

### 6.2 Relaciones clave
- Un `Trip_ID` relaciona **Remitente ⟷ Conductor/Capitán ⟷ Destinatario** (modelo triangular).
- El Destinatario se engancha por **número de celular** buscado en la base de datos.
- El manifiesto se ordena automáticamente por **secuencia geográfica de los muelles de la ruta**.

`[PENDIENTE: diseñar el diagrama entidad-relación completo en PostgreSQL/PostGIS — entregable formal no ejecutado]`

---

## 7. ARQUITECTURA Y STACK TECNOLÓGICO

### 7.1 Decisión de fondo
**Código propio, 100% independiente de terceros comerciales**, sin scripts licenciados ni clones prefabricados. El 80% de las herramientas para programar la lógica estilo Uber son gratuitas; el gasto real está en el salario de los programadores y en el marketing.

### 7.2 Stack definido

| Capa | Tecnología |
|---|---|
| **App móvil** | **Flutter (Dart)** — código único para Android e iOS. Prioridad 90% Android en la Fase 1 |
| **Backend / lógica** | **Node.js** o **Go (Golang)** — microservicios |
| **Tiempo real** | **WebSockets (Socket.io)** |
| **Base de datos en la nube** | **PostgreSQL + extensión PostGIS** (geometrías, geocercas, consultas geográficas) |
| **Base de datos local (celular)** | **SQLite** o **Hive** (modo offline + background sync) |
| **Servidores** | Infraestructura elástica: **AWS** o **Firebase** |
| **Mapas del dashboard** | **Leaflet** o **Mapbox** |
| **Mapas de la app** | Mapas vectoriales en la nube + caché offline. Se recomendó **OpenStreetMap** para el rastreo continuo y dejar Google Maps solo para autocompletar direcciones |

### 7.3 Integraciones y APIs externas
- **API de Pagos con Notificación Push de Nequi** (vía **Nequi Conecta** o **Wompi Colombia**). Variables: `phone_number`, `amount_local`, `merchant_payment_code`. Webhook de confirmación. Timeout 10 min.
- **Pix** — llave Pix / código estático "Copia e Cola"; equivalente evaluado: **API de Cobro Inmediato Pix con QR Dinámico** del Banco Central de Brasil.
- **API de dispersión de fondos** para retiros automáticos 24/7.
- **WhatsApp Business API (Meta)** con plantillas HSM homologadas.
- **API meteorológica**: **OpenWeatherMap**, **Weatherstack** o **API de Google Weather**.
- **Proveedor tecnológico autorizado DIAN**: **Facturatech**, **Siigo** o **Alegra** (generación XML + PDF).
- **Starlink** a bordo de las embarcaciones (conectividad, no API).
- Opcional evaluado: bot de **Web Scraping** para leer tasas de casas de cambio de Leticia a las 7:00 AM.

### 7.4 Ciberseguridad
- **En tránsito:** **SSL/TLS (HTTPS)** con certificados actualizados. Si alguien intercepta la señal Wi-Fi o el internet del río, solo ve código basura ilegible.
- **En reposo:** cifrado **AES-256** para datos sensibles: números de teléfono, llaves bancarias (Nequi / Chave Pix), documentos y billeteras. Impide que un atacante altere saldos o robe información financiera.
- Aislamiento de números no registrados en tabla temporal con purga a 48 h.
- Plantillas HSM homologadas por Meta (previene spoofing y enlaces sospechosos).
- Disparo de mensajería solo tras verificación de pago real (anti-flooding).

### 7.5 Costos de herramientas (clasificación acordada)

**🟢 Completamente gratis (código abierto):**
Node.js, Go (Golang), Python, Dart, Flutter, React Native, PostgreSQL + PostGIS, Socket.io, RabbitMQ, OpenStreetMap.

**🟡 Con capas gratuitas (pagas solo si creces):**
- **Firebase:** capacidad gratuita generosa mensual; con pocas motos conectadas la factura es $0 COP; luego cobran centavos de dólar por GB transferido.
- **Servidores en la nube (AWS, Google Cloud, Azure):** créditos de bienvenida entre **$300 USD y $1.000 USD** o un año de servidores básicos gratis.

**🔴 De pago obligatorio desde el inicio:**
- **Google Maps API** (si se usa): regala **$200 USD de crédito mensual** (≈ **28.000 cargas de mapas gratis al mes**); superado eso, tarifa fija por cada 1.000 peticiones.
- **Pasarelas de pago (Wompi, PayU, ePayco):** sin mensualidad, pero **≈ 3% + $900 COP por transacción exitosa**.
- **Google Play:** **$25 USD una sola vez en la vida**.
- **Apple App Store:** **$99 USD cada año**.

---

## 8. DISEÑO Y UX

### 8.1 Interfaz del Usuario 1 — Remitente (Leticia / Tabatinga)

**Pantalla A — Inicio y conector de divisas:**
- Encabezado: selector de país `[🇨🇴 Colombia / Leticia]` o `[🇧🇷 Brasil / Tabatinga]`.
- Banner superior de confianza con la Moti-Tasa del día: `1.00 BRL = $620.00 COP`.
- Cuerpo central: botón estelar de un solo toque `[📦 ENVIAR UN PEDIDO O MERCANCÍA]`.
- Inferior: tarjeta rápida `[🛵 Pedir Mototaxi (Pasajero)]` — activa automáticamente el recargo nocturno.

**Pantalla B — Destinatario y ciberseguridad de datos:**
- Campo 1: nombre de quien recibe en destino.
- Campo 2: número de celular del Destinatario.
- Aviso de registro seguro si no está registrado.

**Pantalla C — Inventario express por volumen y peso:**
- Selector visual de piezas con multiplicador `[ + / − ]`:
  - `[📦 Caja Pequeña/Pesada (Cerveza)]`
  - `[🧻 Caja Grande/Liviana (Papel Higiénico)]`
- Casilla numérica: `[ Peso Bruto Total: ____ Kilos / Toneladas ]`
- Lista desplegable: `[Muelle de Destino: Tarapacá / La Chorrera / Puerto Nariño]`

**Pantalla D — Transparencia de tarifas y pago:**
```
🚛 Motocarga Terrestre: $15.000 COP
👷‍♂️ Conector de Carga:  $20.000 COP
🚢 Flete Fluvial:       $120.000 COP
💰 TARIFA TOTAL:        $155.000 COP / 250.00 BRL
```
- Botón: `[💸 PAGAR SEGURO CON NEQUI PUSH]`

**Desglose de cadena logística con la licencia visible:**
```
🚛 Motocarga Terrestre: $15.000 COP
👷‍♂️ Conector de Carga:  $10.000 COP
🚢 Licencia de Software: $0 COP (Incluido en el flete)
```

### 8.2 Interfaz del Conector de Carga (Cargador)
- Alerta vibratoria con inventario exacto antes de que se pida el carro.
- `[Aceptar Tarifa Sugerida de la App: $25.000 COP]`
- `[Lanzar Contraoferta: $____ COP]`

### 8.3 Interfaz del Conductor de Motocarga
- Notificación de radar con sonido prioritario al más cercano.
- Bloqueo preventivo de la categoría moto para el muelle.
- Indicador: `[✓ Conductor + Ayudante Activado: +$20.000 COP para el diario del ayudante]`
- Cierre: `[Finalizar Viaje]` → liquidación en un segundo, descuento de comisión, conductor libre en el mapa.

### 8.4 Interfaz del Capitán
- Programación de rutas: dibuja paradas fijas del río y días de salida.
- Bitácora de carga ordenada geográficamente.
- Etiquetas: `[PAGADO EN ORIGEN]` / `[🔴 POR COBRAR CONTRAENTREGA: $X pesos]`
- Botón `[Llegada a Puerto Nariño]` → sincroniza y dispara notificaciones.
- Corre en segundo plano con Starlink; si hay apagón escribe local en SQLite.

### 8.5 Interfaz del Usuario 2 — Destinatario
- Tarjeta activa de monitoreo: *"Tu mercancía (20 cajas) viene a bordo del barco El Gran Delfín (Calificación: ⭐ 4.9). El capitán estima la llegada entre el martes y el jueves"*.
- Mapa de navegación satelital: visor interactivo offline con la última coordenada reportada por Starlink.
- Notificación push con **sonido exclusivo de Moti**.
- Pantalla bloqueada con código gigante: `[🔑 TOKEN DE RETIRO SEGURO: #7415]`

### 8.6 Interfaz del mapa de conducción
- Botón lateral flotante `[🚨 Reportar Evento]`.
- Botón flotante de mute `[🔊]` / `[🔇]` en la esquina superior derecha, siempre visible.
- Overlay de alerta roja `#FF0000` + icono gigante de PARE + flecha de sentido de vía.
- Vibración háptica de tres pulsaciones largas.

### 8.7 Billetera "Moti-Wallet"
- Gráfico limpio con el saldo acumulado por viajes de Nequi Push y Pix.
- Botón `[Retirar a mi Nequi/Pix]` disponible 24/7.
- Indicador de estado del retiro en tiempo real.

### 8.8 Módulo transversal "Moti-Clima"
Pantalla de carga: *"Verificando condiciones climáticas por satélite en tu ubicación..."* → veredicto (ver 4.29).

### 8.9 Principios de UX declarados
- Cero fricción: registro en 3 clics, cierre de viaje en un toque.
- Cero matemáticas para el usuario de la calle (sin cintas métricas, sin conversiones manuales).
- Transparencia total: todo desglosado antes de confirmar.
- Alta visibilidad para conducción en moto.
- Idiomas: **español y portugués**, con traducción automática en el chat.

`[PENDIENTE: no se definieron paleta de colores de marca, tipografía, logotipo ni identidad visual, salvo el rojo #FF0000 de la alerta de PARE]`

---

## 9. MONETIZACIÓN, PLANES Y PRECIOS

### 9.1 Modelos evaluados
- **Idea A — Suscripción fija para mototaxis:** mensualidad fija (ej. **$30.000 COP al mes**) por tener la app activa, y todo lo que hagan en el día es 100% para ellos. Justificación: en Leticia y Tabatinga los mototaxistas se conocen entre sí y cobrar comisión por viaje puede ser difícil al inicio.
- **Idea B — Comisión por porcentaje en carga y barcos:** para envíos fluviales a Tarapacá o La Chorrera (mercancías costosas: mercados, electrodomésticos, motores), Moti cobra **5% o 10% del valor total del flete**.
- Otras cifras citadas en la conversación: comisión de **$500 COP por carrera**, **$1.000 COP por una carrera de motocarro**, **5% de un flete fluvial**, **10% de comisión** en el ejemplo de la billetera ($15.000 → $1.500).
- Tarifa diaria alternativa citada: **$5.000 COP al día** por dejar usar la app.

`[PENDIENTE: NO se eligió el modelo definitivo de monetización ni los porcentajes finales. El fundador nunca respondió a la pregunta "¿comisión por viaje o suscripción?"]`

### 9.2 Mecanismo de cobro (sí definido)
- La comisión **se descuenta automáticamente del monedero digital** del conductor/capitán en el milisegundo en que el servicio se marca como "Completado".
- En pagos digitales, el dinero entra a la cuenta central de Moti S.A.S., que **retiene la comisión** y abona el resto a la billetera del operador.
- En pagos en efectivo, se hace **cruce de saldos interno** contra el saldo digital acumulado.
- **Bloqueo por saldo insuficiente:** si el monedero llega a cero o negativo (solo en escenarios de efectivo prolongado), el backend pausa al conductor hasta que recargue.

### 9.3 Otras fuentes de ingreso mencionadas
- Cobro premium a **empresas de encomiendas** por el servicio de alerta satelital de llegada.
- Venta del **panel de administración a bodegas y agencias de envío** del muelle de Leticia. `[PENDIENTE]`
- Tarifa diferenciada por **conductor turístico bilingüe**. `[PENDIENTE]`

### 9.4 Presupuestos de desarrollo evaluados (histórico)
| Modelo | Presupuesto |
|---|---|
| Modelo "WhatsApp Business" (web centralizada, asignación manual por chat) | $2'000.000 – $4'000.000 COP |
| Script licenciado (clon de Uber prefabricado) | $15'000.000 – $30'000.000 COP |
| PWA (Aplicación Web Progresiva) | $35'000.000 – $50'000.000 COP |
| App de motos local (MVP) | $50'000.000 – $85'000.000 COP |
| MVP estilo DiDi | $70'000.000 – $110'000.000 COP |
| Sistema multi-ciudad escalable (MVP) | $85'000.000 – $120'000.000 COP |
| Desarrollo desde cero tipo Uber | más de $80'000.000 COP |

**Estrategias de ahorro citadas:** lanzar solo para Android reduce el costo del proyecto en un **40%** (en Colombia más del **85%** de los usuarios y casi el **98%** de los conductores usan Android); usar OpenStreetMap en vez de Google Maps; zonificación fija en vez de GPS en tiempo real; Flutter/React Native recortan a la mitad el costo de desarrollo móvil.

`[PENDIENTE: el fundador nunca declaró su presupuesto máximo ni con cuántos conductores estima iniciar]`

---

## 10. TÉRMINOS Y CONDICIONES — TEXTO COMPLETO REDACTADO

> Todos los textos siguientes son los redactados literalmente durante la conversación.

### 10.1 Preámbulo y Declaración de Identidad Tecnológica

**"CONTRATO DE USO DE LA PLATAFORMA TECNOLÓGICA MOTI"**

> El presente documento regula el acceso y uso de la aplicación móvil Moti (en adelante, "La Aplicación"), propiedad de **[Nombre de tu Empresa o tu Nombre Real S.A.S.]**, una sociedad constituida bajo las leyes de la República de Colombia.
>
> Moti es única y exclusivamente una empresa de base tecnológica. Moti no provee servicios de transporte público, no es una empresa de transportes, no actúa como agencia de viajes, ni opera como un transportador de carga o pasajeros. La Aplicación funciona únicamente como un canal de intermediación y punto de encuentro digital que conecta a terceros independientes que ofrecen servicios de mensajería, mandados o arrendamiento de vehículos con conductor (en adelante, "Conductores Colaboradores") con personas que requieren dichos servicios (en adelante, "Usuarios").

### 10.2 Modelo Contractual (Arrendamiento y Corretaje)

> **Naturaleza de la Relación:** Cuando un Usuario solicita un traslado a través de Moti, acepta celebrar un **Contrato de Arrendamiento de Vehículo con Conductor** de carácter privado (amparado por el Código Civil Colombiano) directamente con el Conductor Colaborador.
>
> En los servicios de domicilios, se configurará un **Contrato de Mandato o Corretaje** (Código de Comercio), donde el Conductor Colaborador actúa como mandatario del Usuario para realizar una gestión o compra específica. Moti permanece ajena a esta relación contractual directa entre las partes.

### 10.3 Cláusula de Indemnidad y Exclusión de Responsabilidad

> **Exclusión de Responsabilidad:** Moti no será responsable por ningún daño, perjuicio, pérdida, hurto, accidente, lesión o fallecimiento que ocurra durante el desarrollo de los servicios acordados entre el Usuario y el Conductor Colaborador.
>
> **Indemnidad de Tránsito y Legal:** El Conductor Colaborador es un contratista independiente, titular y conductor de su propio vehículo. Por lo tanto, el Conductor Colaborador asume la total responsabilidad civil, penal y de tránsito de su operación. En caso de inmovilización del vehículo por parte de las autoridades de tránsito del municipio bajo la acusación de transporte informal o cualquier otra infracción al Código Nacional de Tránsito (**Ley 769 de 2002**), el Conductor Colaborador asumirá el 100% de los costos de grúa, patios, multas y honorarios legales, manteniendo a Moti completamente indemne.

### 10.4 Obligaciones y Documentación del Conductor

> Para mantener una cuenta activa en Moti, el Conductor Colaborador se obliga a proveer información verídica y mantener vigentes los siguientes documentos: (i) Cédula de Ciudadanía colombiana, (ii) Licencia de Conducción vigente para motocicleta (A2), (iii) Seguro Obligatorio de Accidentes de Tránsito (SOAT) vigente, y (iv) Certificado de Revisión Técnico-Mecánica vigente.
>
> El uso de documentación falsa o vencida constituirá una violación grave a estos términos y dará lugar al bloqueo inmediato de la cuenta y al reporte ante las autoridades competentes.

### 10.5 Independencia Laboral (No hay empleados)

> **Inexistencia de Relación Laboral:** Nada de lo dispuesto en estos Términos y Condiciones, ni el uso de La Aplicación, configura una relación de trabajo, subordinación, sociedad o contrato laboral entre Moti y el Conductor Colaborador. El Conductor Colaborador es libre de conectarse a La Aplicación a las horas que desee, no cumple turnos, no recibe órdenes directas y utiliza sus propias herramientas de trabajo (motocicleta y teléfono móvil). El Conductor Colaborador es responsable de realizar de forma independiente sus aportes al sistema de seguridad social como trabajador independiente.

### 10.6 Métodos de Pago y Tarifas ("Aportes Sugeridos")

> Moti sugerirá un valor estimado para el servicio basado en algoritmos de zonas geográficas de la ciudad ("Aporte Sugerido"). El Usuario y el Conductor Colaborador son libres de aceptar este valor. Moti cobrará al Conductor Colaborador una tarifa por el derecho de uso del software (licenciamiento de tecnología), la cual podrá ser descontada de los saldos digitales o pagada mediante recargas en puntos de recaudo autorizados.

### 10.7 Cláusula de Ayudantes Independientes

> **Cláusula de Ayudantes Independientes:** El Conductor Colaborador es totalmente libre de designar a un tercero de su confianza (Ayudante) para la ejecución de las labores físicas de cargue y descargue en la categoría de Acarreos/Motocargas. Dicho ayudante es contratado de forma directa, civil y voluntaria por el conductor bajo el modelo de jornal o "liga" diaria. Moti no tiene ningún vínculo laboral, contractual ni de subordinación con los ayudantes, siendo el conductor el único responsable de su seguridad en el volco.

### 10.8 Independencia de la Relación Comercial (devoluciones y rechazos)

> **Independencia de la Relación Comercial:** Moti es un intermediario tecnológico y no garantiza la idoneidad, calidad, estado o concordancia de las mercancías transportadas. Una vez que el Conductor o Capitán arribe al destino pactado, el servicio se considerará ejecutado en su totalidad. Cualquier rechazo de la carga, error en el inventario o necesidad de retorno constituirá un servicio nuevo e independiente, el cual deberá ser solicitado y pagado de forma separada a través de La Aplicación, eximiendo a Moti de cualquier costo operativo o logístico derivado de disputas entre el remitente y el destinatario.

### 10.9 Limitación de Responsabilidad por Mercancías y Logística

> **LIMITACIÓN DE RESPONSABILIDAD POR MERCANCÍAS Y LOGÍSTICA:** El Licenciante [Tu Empresa] no es una empresa de transporte, almacenamiento, mensajería ni logística. La Aplicación Moti funciona exclusivamente como un canal automatizado de conexión entre usuarios independientes.
>
> El Licenciante no realiza control, inspección, aforo ni custodia de ninguna clase sobre los bienes, cajas, empaques, volúmenes o toneladas registradas por los usuarios. En consecuencia, el Licenciante no se hace responsable bajo ninguna circunstancia por la pérdida, daño, deterioro, hurto, retención aduanera o destrucción de mercancías durante el transporte terrestre o fluvial. Cualquier reclamación relacionada con la carga deberá ser resuelta directamente entre el remitente, el conector de carga y el transportista asignado, renunciando las partes a vincular judicial o extrajudicialmente al creador o propietario del software.

### 10.10 Naturaleza del producto (EULA)

Bajo el **Contrato de Licencia de Uso No Exclusivo (EULA)**, se establecen tres verdades legales:

1. **La Naturaleza del Producto:** Moti es un activo de propiedad intelectual (un programa de computador). El usuario no está pagando un flete; está pagando una tarifa por el derecho a usar las funciones del código del software para buscar un conductor o un cargador.
2. **Exclusión Absoluta de Responsabilidad Real:** la licencia se entrega **"tal como está" (As-Is)**. El software no tiene capacidad física de revisar qué hay dentro de las cajas ni si el barco tiene o no Starlink. Por ende, la plataforma no asume ninguna responsabilidad civil por pérdidas, daños, robos, retrasos o contrabando en la frontera.
3. **Autonomía del Operador:** cada conductor, capitán o cargador es el único responsable legal del cumplimiento de las leyes de tránsito, aduanas e impuestos en Leticia y Tabatinga. El software es solo una herramienta, como un celular o un computador: si alguien comete una infracción usándolo, la culpa es del usuario, no de la empresa que fabricó la herramienta.

### 10.11 Cláusulas adicionales OBLIGATORIAS identificadas (redacción descriptiva, texto final pendiente)

**1. Cláusula de Control de Contrabando y Mercancías Prohibidas (Zofra / Aduanas).**
Leticia y Tabatinga manejan un régimen aduanero especial, pero el transporte río arriba hacia Tarapacá o La Chorrera está sujeto a control estricto de la **DIAN** y la **Policía Fiscal y Aduanera (POLFA)** contra contrabando de combustible, licores, cigarrillos o precursores químicos.
Los T&C deben establecer **taxativamente** que está prohibido usar Moti para coordinar mercancías ilegales, contrabando o sustancias controladas. Si una autoridad detiene una motocarga o un barco con carga ilegal, **el Usuario Remitente es el único responsable penal y civil**, exonerando a Moti y **autorizando a la plataforma a entregar los datos de registro (cédula, IP, historial de chat) a la Fiscalía o autoridades competentes de inmediato**.

**2. Cláusula de Jurisdicción Bilateral y Conflicto de Leyes ("Ley Aplicable y Jurisdicción").**
- Servicios originados en **Colombia** ⇒ legislación comercial colombiana y **jueces de Leticia**.
- Servicios originados en **Brasil** ⇒ **Código Civil brasileño**.
- Objetivo: evitar que un ciudadano brasileño demande a la S.A.S. colombiana bajo leyes de Brasil, forzando que toda reclamación se tramite en el domicilio de la empresa.

**3. Cláusula de Riesgo Fluvial Mayor (Caso Fortuito o Fuerza Mayor Fluvial).**
Riesgos propios del río: **palizadas (troncos flotantes)**, tormentas amazónicas que voltean embarcaciones, cambios extremos del nivel del río (**vaciante**) que encallan barcos por semanas.
Debe quedar claro que si el barco encalla o sufre un siniestro por causas de la naturaleza, **Moti no asume ninguna responsabilidad patrimonial** sobre las toneladas o cajas perdidas, ya que el software solo conectó a las partes, no navegó el barco.

**4. Cláusula de Prohibición de Trabajo Infantil y Cumplimiento de Edad Mínima.**
Los T&C obligan al conductor a garantizar que cualquier ayudante que suba al volco para el esfuerzo físico **cumpla con la edad legal para trabajar en Colombia (mayor de 18 años, o las excepciones de ley con permiso)**. Violarla implica **expulsión inmediata y definitiva** del conductor de la plataforma.

`[PENDIENTE: redactar el texto literal definitivo de estas cuatro cláusulas]`

### 10.12 Implementación de los T&C en el software
1. **Pantalla de registro obligatoria:** al abrir la app por primera vez, usuario y conductor deben ver el texto de los T&C.
2. **Casilla de verificación activa (checkbox):** **no se debe activar por defecto**. El usuario debe marcarla manualmente ("Acepto los Términos y Condiciones de Moti"). El botón "Continuar" permanece bloqueado hasta que la marquen.
3. **Registro en base de datos:** cada aceptación registra **fecha, hora exacta y dirección IP**. Prueba reina ante un juez de que el conductor aceptó liberar de responsabilidad a la empresa.

### 10.13 Recomendación legal expresa
> Aunque se copie la estructura de los T&C de DiDi o Uber, en Colombia la aplicación de la norma varía según el municipio. **Es obligatorio que un abogado comercial colombiano redacte la versión final del contrato de términos**, adaptándolo explícitamente a las regulaciones de la alcaldía local de la ciudad donde se vaya a lanzar.

### 10.14 Estrategia de lenguaje comercial (anti competencia desleal)
- **Eliminar las palabras "Taxi" o "Tarifa de Transporte"** de la publicidad, la interfaz y los contratos. Nunca usar palabras comerciales reguladas.
- Usar en su lugar: **"Aporte sugerido"**, **"Costo de intermediación"**, **"Servicio de mensajería"**, **"Conductor colaborador"**.
- Habilitar el módulo de **"Alquiler de Moto con Conductor"** (figura del derecho privado, Código Civil, no transporte público regulado).
- **Enfoque de Mensajería/Domicilios como escudo principal:** en Colombia el transporte de mercancías y la mensajería urbana expresa no tienen las mismas restricciones que el transporte de pasajeros en moto. Si los T&C especifican que la app es principalmente para **"mandados, domicilios y mensajería"** y de manera secundaria permite movilidad compartida entre ciudadanos, se crea un escudo legal sólido ante los inspectores de tránsito locales.

`[PENDIENTE: el fundador nunca respondió si redacta los términos bajo la figura de mensajería/domicilios o directo por arrendamiento de vehículo]`

---

## 11. POLÍTICA DE PRIVACIDAD Y TRATAMIENTO DE DATOS

**Estado: `[PENDIENTE — NO SE REDACTÓ]`**

Lo único definido:
- Se identificó como **obligatoria por ley en Colombia** que vaya junto a los T&C (**Ley 1581 de 2012 — Habeas Data**).
- Se ofreció revisar su texto y **el fundador no respondió**.
- Se identificó el riesgo de sanciones de la **SIC (Superintendencia de Industria y Comercio)** por enviar mensajes a ciudadanos que no han aceptado previamente la política de tratamiento de datos.
- Requisitos técnicos ya acordados que la política debe reflejar:
  - Aceptación explícita obligatoria antes de habilitar la visualización de envíos al Destinatario.
  - Cifrado AES-256 en reposo y SSL/TLS en tránsito.
  - Purga automática de perfiles turistas a los 30 días de inactividad, **borrando la foto del pasaporte o cédula**.
  - Purga automática de números en tabla temporal de "Espera de Registro" a las **48 horas**.
  - Autorización expresa para entregar datos de registro (cédula, IP, historial de chat) a la Fiscalía o autoridades competentes en casos de contrabando o carga ilegal.

`[PENDIENTE: redactar el texto completo de la Política de Tratamiento de Datos Personales conforme a la Ley 1581 de 2012]`

---

## 12. REQUISITOS LEGALES / REGULATORIOS MENCIONADOS

### 12.1 Colombia
- **Ley 769 de 2002** — Código Nacional de Tránsito (artículo 26: inmovilización por transporte informal).
- **Ley 256 de 1996** — Competencia desleal. Las demandas más peligrosas vienen de gremios formales (taxistas, empresas de transporte intermunicipal).
- **Ley 1581 de 2012** — Habeas Data / protección de datos personales.
- **Código Civil Colombiano** — contrato de arrendamiento de vehículo con conductor.
- **Código de Comercio** — contrato de corretaje / mandato / "alquiler de espacio tecnológico".
- **Superintendencia de Transporte** — entidad de control a evitar por la vía de la naturaleza tecnológica.
- **Superintendencia de Industria y Comercio (SIC)** — sanciones por mensajería no autorizada.
- **DIAN** — facturación electrónica, IVA / ICA, retenciones.
- **POLFA (Policía Fiscal y Aduanera)** — control de contrabando.
- **Régimen aduanero especial** de Leticia y Tabatinga.
- Constitución como **S.A.S. (Sociedad por Acciones Simplificada)** en la Cámara de Comercio local para proteger el patrimonio personal. `[PENDIENTE: el fundador no respondió]`
- **Póliza de Responsabilidad Extracontractual Comercial** negociada con una aseguradora local que cubra los viajes activos dentro de la aplicación, para blindarse al 100% cuando la empresa crezca. `[PENDIENTE: sin respuesta]`
- Contexto: Uber, DiDi, Cabify e InDrive han enfrentado batallas legales, multas de la Superintendencia de Transporte y demandas por competencia desleal por el vacío normativo del transporte privado en vehículos particulares o motos.

### 12.2 Brasil
- **Ley Federal 12.009 de 2009** — regula y legaliza el mototaxismo en Brasil.
- **Receita Federal** — autoridad fiscal.
- **ISS (Imposto Sobre Serviços)** — impuesto aplicable a servicios dentro de Tabatinga o que crucen la frontera. El módulo de facturación debe aplicar **reglas fiscales de geolocalización**.
- **ANTAQ** — autoridad de transporte acuaviario mencionada.
- **CNH** y **CPF** — documentación de operadores brasileños.

### 12.3 Regla no escrita (gremial)
- **Soberanía de placas** entre los gremios de Leticia y Tabatinga (ver 4.30).
- **Prohibición de ingreso de motos comunes con carga al muelle** (ver 4.2).

### 12.4 Filtros de responsabilidad civil exigidos al software
1. Validación de antecedentes penales y fiscales del conductor.
2. Bloqueo automático por SOAT o Técnico-Mecánica vencidos. *(Si ocurre un accidente y la app permitió trabajar a una moto sin SOAT, la empresa sí podría ser vinculada legalmente por negligencia.)*
3. Almacenamiento obligatorio de la documentación.

---

## 13. REQUISITOS NO FUNCIONALES

### 13.1 Rendimiento y peso
- **Peso de descarga app Pasajero/Cliente:** **25 MB – 45 MB**.
- **Peso de descarga app Conductor/Capitán:** **30 MB – 55 MB** (incluye lógica de cámara para subir documentos y lector de manifiestos).
- **Objetivo consolidado: menos de 50 MB.**
- **Mapas offline urbanos:** +5 MB adicionales.
- Debe correr en **celulares de gama baja**, muy usados en la región.

**Estrategias para mantener el peso bajo:**
1. **Mapas vectoriales en la nube, no guardados en el celular.** El teléfono solo descarga el "esqueleto" visual; las imágenes de mapas se cargan desde internet a medida que el usuario se mueve.
2. **Imágenes optimizadas en formato WebP** (fotos de perfil, iconos de barcos y motocarros).
3. **Código limpio (Tree Shaking).** El compilador de Flutter elimina automáticamente código muerto y librerías no utilizadas.

### 13.2 Escalabilidad
- **Servidores elásticos autónomos (AWS o Firebase).** Con poco tráfico gastan el mínimo; si el aeropuerto se llena de turistas escaneando el QR, el servidor se expande solo.
- Bases de datos clúster para soportar el paso de 50 usuarios en una ciudad a 5.000 en varias.
- Geocercas dinámicas para habilitar nuevas ciudades desde el panel **sin tocar el código de la app**.
- Configurador de moneda y pasarelas regionales activables/desactivables por zona.

### 13.3 Seguridad
- SSL/TLS en tránsito, AES-256 en reposo (ver 7.4).
- Exigido por Google Play, Apple App Store y las regulaciones bancarias de las APIs de Nequi y Pix.

### 13.4 Disponibilidad y autonomía
- Retiros 24/7.
- Cero soporte humano.
- Funcionamiento con señal intermitente (offline + background sync).

### 13.5 Fase de pruebas obligatoria antes del lanzamiento

**1. Entorno de Sandbox (simulación).** Antes de conectar cuentas bancarias reales de Nequi y Pix: probar el sistema con **100 viajes falsos a las 2:00 AM**, simulando gente borracha, cancelaciones de última hora y toneladas de carga ficticias, para verificar que el código responda ante cualquier malicia o error de señal en la frontera.

**2. Lanzamiento Beta Cerrado (prueba con conocidos en Leticia).** Antes de inundar el aeropuerto con códigos QR, habilitar la app únicamente para un grupo pequeño de confianza: **5 mototaxistas, 2 motocargas con sus ayudantes y 1 capitán de barco conocido**. Operar de forma oculta durante **una semana** para ver cómo reacciona la app al cruzar a Tabatinga y perder señal, o al usar Nequi Push en el muelle. Corregir en caliente sin que el público se entere.

**3. Servidores elásticos autónomos** (ver 13.2).

---

## 14. ROADMAP / FASES DE DESARROLLO

### 14.1 Fases acordadas
1. **Diseño lógico y reglas de negocio** — ✅ **COMPLETADO** (es el contenido de este documento).
2. **Documentación técnica formal** — ⏳ **PENDIENTE**. Dos entregables definidos, sin elegir:
   - **Opción 1:** Documento de Requerimientos de Software Completo (**SRS**) / User Flow textual detallado para los 5 actores.
   - **Opción 2:** Esquema Técnico de Base de Datos Relacional (tablas, llaves primarias, campos cifrados AES-256, llaves de PostGIS).
3. **Desarrollo del código fuente** conectando las APIs.
4. **Construcción del Dashboard Web de administración**.
5. **Sandbox** (100 viajes simulados).
6. **Beta cerrado** en Leticia (5 mototaxistas + 2 motocargas + 1 capitán, 1 semana).
7. **Lanzamiento público** con despliegue de QR en el aeropuerto.

### 14.2 Estrategia de despliegue territorial
- Lanzamiento piloto en el nodo **Leticia – Tabatinga**.
- Expansión fluvial a **Puerto Nariño, Tarapacá, La Chorrera**.
- Arquitectura preparada para abrir nuevas ciudades **en cuestión de días** mediante geocercas dinámicas desde el panel.

### 14.3 Estrategia de mercado pendiente
- Captación de los primeros capitanes y líderes de cargadores del muelle de Leticia. `[PENDIENTE: ofrecida como entregable, nunca ejecutada]`
- Activación de conductores: equipo en tierra o pauta digital local (Facebook/Instagram) para reclutar y verificar antecedentes de los primeros 20 o 30 conductores por ciudad nueva.

---

## 15. DECISIONES TOMADAS Y ALTERNATIVAS DESCARTADAS

| Decisión | Alternativa descartada | Motivo declarado |
|---|---|---|
| **Código propio a la medida** | Script licenciado / clon de Uber prefabricado | El código no sería propio y sería difícil o imposible de modificar |
| **App nativa multiplataforma (Flutter)** | PWA; apps nativas separadas Kotlin+Swift | Un solo código para Android e iOS reduce el costo a la mitad |
| **Enfoque en motos, motocarros, motocargas y fluvial** | Carros particulares tipo Uber/DiDi | En el Amazonas el carro es escaso y costoso |
| **Leticia–Tabatinga como piloto** | Ciudades intermedias del interior (Fusagasugá, Tunja, Duitama, Ocaña, Aguachica); Costa Caribe; Eje Cafetero; Llanos | Mercado aislado, turístico, con moto y río como única movilidad |
| **Rastreo GPS continuo por Starlink** | Sistema de checkpoints manuales por falta de señal | El fundador informó que **todos los barcos ya usan Starlink** |
| **Moti-Tasa manual / promedio local** | Conversor automático por API de TRM oficial (ExchangeRate-API, Open Exchange Rates) | En Leticia la TRM oficial no manda; cada casa de cambio tiene precio distinto (6.50 vs 6.00) |
| **Solo conversión de moneda** | Billetera virtual compartida "Moti-Monedero" para transferir saldo a familiares | *"No, solo se hace conversión de moneda dentro de la app"* |
| **Multiplicador de piezas + peso total** | Ingreso de dimensiones Alto×Ancho×Largo por caja | Medir 20 cajas con cinta métrica sería tedioso y la gente desinstalaría la app |
| **Pago inmediato en Origen o Destino** | "Moti-Fiado" / crédito a fin de mes | *"Acá es o paga al enviar o al recibir"* |
| **Precios fijos y transparentes** | Tarifa dinámica por clima ("factor aguacero") | *"El que quiera trabajar que trabaje, sea con lluvia o con sol"*; en el Amazonas llueve todos los días |
| **Recargo nocturno estandarizado** | Cobro libre del conductor de noche | Transparencia; evita el *"a esta hora le cobro el doble"* |
| **Reasignación express + suspensión temporal** | Penalización económica al cliente por cancelar | *"No, la penalización para el cliente no"* |
| **Validación climática por API** | Botón de cancelación por lluvia sin verificar | Evita que se use como excusa en días soleados de 30 grados |
| **Solo Efectivo, Nequi/Bre-B y Pix** | Tarjetas de crédito, pasarelas internacionales, enrutamiento multi-pasarela | Simplifica la arquitectura, elimina comisiones de terceros |
| **Billetera con abono automático + retiros 24/7** | Modelo de recarga manual previa obligatoria | El conductor no tiene que estar recargando a cada rato |
| **Retiro inmediato bajo demanda 24/7** | Ciclo automático semanal (viernes 4:00 PM) o corte diario | El conductor puede retirar cualquier día y a cualquier hora |
| **WhatsApp Business API con disparo tras pago real** | SMS automáticos desde el servidor a números no registrados | Riesgo de inyección de datos, SMS spoofing/flooding, desviación de mensajes y sanciones de la SIC |
| **Conexión pura / intermediación** | Gestión de devoluciones, disputas comerciales, custodia de mercancía | Perdería la condición de empresa de tecnología y sería catalogada como empresa de transporte con responsabilidad civil |
| **Cargador contratado ANTES del transporte terrestre** | Contratar el cargador al llegar al muelle | Elimina la incertidumbre de que le cobren un precio exagerado en la orilla |
| **Soberanía de placas programada** | Asignación libre a ambos lados de la frontera | Respeta la "ley invisible" entre gremios y evita conflictos territoriales |
| **Modo Turista solo efectivo con Google/Apple ID** | Registro estándar con SMS a número local | Los extranjeros viajan con roaming apagado y sin Nequi ni Pix |
| **Tono profesional y neutro** | Jerga rola / modismos colombianos | El fundador lo pidió tres veces explícitamente |

---

## 16. GLOSARIO DE TÉRMINOS DEL PROYECTO

| Término | Significado |
|---|---|
| **Moti** | Nombre de la plataforma |
| **Moti-Tasa** | Tasa de cambio COP/BRL controlada por la plataforma según el mercado callejero de Leticia, no la TRM oficial |
| **Moti-Conector** | Módulo del servicio de cargadores del muelle (puente físico tierra ⟷ barco) |
| **Moti-Clima** | Algoritmo de validación climatológica por geolocalización para autorizar cancelaciones |
| **Moti-Alerta** | Módulo de asistencia vial: PARES ocultos, retenes, semáforos, accidentes |
| **Moti-Wallet** | Billetera digital interna del conductor/capitán/cargador |
| **Moti-Cashout** | Módulo de retiros 24/7 |
| **Moti-Refugio** | Estado de pausa segura del conductor durante una tormenta, con prioridad post-tormenta |
| **Moti-Portal** | Portal web para comerciantes mayoristas |
| **Moti-Sello** | Sticker con QR físico pegado a las cajas |
| **Moti-Offline** | Visualización del último estado conocido del barco sin internet |
| **Moti-Premium** | Algoritmo de ranking por estrellas |
| **Moti-Padrino** | Sistema de referidos propuesto |
| **Conductor Colaborador** | Denominación contractual del conductor independiente |
| **Conector de Carga / Cotero / Cargador** | Trabajador del muelle que pasa la mercancía del vehículo al barco |
| **Líder de Cuadrilla** | Jefe del grupo de cargadores; recibe el pago y reparte entre sus empleados |
| **La liga** | Jornal/pago diario del ayudante del conductor de motocarga |
| **Aporte Sugerido** | Denominación contractual de la tarifa, para no usar lenguaje comercial regulado |
| **Modelo Triangular** | Arquitectura de 3 actores por orden: Remitente + Conductor/Capitán + Destinatario |
| **Token de Retiro Seguro** | Código OTP de 4 dígitos custodiado por el Destinatario |
| **Peso Volumétrico** | Peso equivalente calculado por el espacio ocupado, cobrado si supera el peso real |
| **Aforo** | Capacidad máxima de carga de la embarcación (toneladas o piezas) |
| **Manifiesto Digital** | Bitácora electrónica de carga del capitán, ordenada por ruta |
| **Checkpoint** | Muelle/parada donde el capitán marca llegada y dispara notificaciones |
| **Geocerca (Geofencing)** | Perímetro virtual (2 km alrededor de muelles, línea fronteriza, zonas de riesgo) |
| **Vaciante** | Época de bajo nivel del río Amazonas |
| **Palizada** | Troncos flotantes que representan riesgo de navegación |
| **Apagón fronterizo** | Pérdida de señal celular al cruzar entre Leticia y Tabatinga |
| **Efecto Puente** | Registro del viaje por GPS puro durante la pérdida de señal, con sincronización posterior |
| **Bre-B** | Sistema de llaves de pago interoperables de Colombia mencionado junto a Nequi |
| **Pix / Chave Pix** | Sistema de transferencia instantánea del Banco Central de Brasil y su llave identificadora |
| **HSM** | Highly Structured Message — plantilla homologada por Meta para WhatsApp Business |
| **EULA** | End User License Agreement — Acuerdo de Licencia para el Usuario Final |
| **Leticia Express** | Competidor local de envíos de mercancía, sin app |

---

## 17. LISTA CONSOLIDADA DE PENDIENTES

> ⚠️ **ESTA LISTA ESTÁ CERRADA.** Se conserva como registro histórico de lo que quedó abierto al final de la conversación de diseño. **La resolución de cada uno de estos 34 puntos está en la Sección 19.** Si hay contradicción entre esta sección y la 19, manda la 19.

### 17.1 Entregables técnicos no ejecutados
1. **Documento de Requerimientos de Software Completo (SRS) / User Flow detallado** para los 5 actores.
2. **Esquema Técnico de Base de Datos Relacional** (diagrama entidad-relación, tablas, llaves primarias, campos AES-256, llaves PostGIS).
3. **Diagrama de flujo lógico de la aplicación** (interacción secuencial de pantallas).
4. **Construcción del Dashboard Web de administración**.
5. **Escritura del código fuente**.

### 17.2 Decisiones de negocio abiertas
6. **Modelo de monetización definitivo:** comisión por viaje vs. suscripción fija; porcentajes y valores exactos.
7. **Presupuesto máximo de arranque** — nunca declarado.
8. **Número de conductores estimado para iniciar** — nunca declarado.
9. **Modelo definitivo para los coteros:** Solución A / B / C / Aviso de Convivencia / Marketplace con pago digital al líder.
10. **Valor definitivo de la liga del ayudante** ($15.000 vs $20.000 COP).
11. **Horario definitivo del recargo nocturno** (7:00 PM u 8:00 PM → 5:00 AM).
12. **Cobro extra por carga frágil** (¿se cobra? ¿cuánto?).
13. **Opción definitiva de automatización de la Moti-Tasa** (scraping / promedio colaborativo / margen fijo sobre TRM).
14. **Registro de conductores por fases** (30 días de gracia para SOAT y Tecnicomecánica) — sin respuesta.
15. **Verificación de antecedentes:** ¿automática con IA o manual desde el panel?
16. **Declaración de monedas físicas disponibles por el cliente** para refinar el filtro de pago.
17. **Sistema de asignación:** puramente geográfico (más cercano) vs. Fila de Espera Virtual por turnos.
18. **Constitución como S.A.S.** — sin respuesta.
19. **Póliza de Responsabilidad Extracontractual Comercial** — sin respuesta.
20. **Figura contractual principal:** mensajería/domicilios vs. arrendamiento de vehículo con conductor.

### 17.3 Documentos legales por redactar
21. **Política de Tratamiento de Datos Personales** (Ley 1581 de 2012) — texto completo.
22. **Texto literal de las 4 cláusulas de frontera**: contrabando/aduanas, jurisdicción bilateral, riesgo fluvial mayor, trabajo infantil.
23. **Revisión final por abogado comercial colombiano** adaptada a la alcaldía local de Leticia.
30. Almacenes que dejen a Moti Motocargas como transportador oficial. — CERRADO en 19.4 (P30): descartado, lo decide el usuario.
25. **Reglas fiscales de geolocalización para el ISS brasileño** — definidas conceptualmente, sin detalle.

### 17.4 Funcionalidades propuestas sin veredicto
26. Ideas 2, 3, 5, 7, 9, 10, 11, 15, 19, 22, 23 (ver tabla 4.43).
27. Etiquetas rápidas de calificación.
28. Alianzas con agencias de carga del muelle (venta del panel).
29. Categoría "Moti-Turismo" / conductor bilingüe certificado.
30. Almacenes que dejen a Moti Motocargas como transportador oficial.
31. API de Cobro Inmediato Pix con QR Dinámico — evaluación formal.
32. Canal de soporte / trazabilidad como prueba legal ante decomisos aduaneros.

### 17.5 Diseño
33. Identidad visual: logotipo, paleta de colores de marca, tipografía. Solo está definido el rojo `#FF0000` de la alerta de PARE.
34. Estrategia de lanzamiento y captación de capitanes y líderes de cuadrilla en el muelle.

---

## 18. PROMPT DE ARRANQUE PARA EL AGENTE DEL PROYECTO NUEVO

> Copiar y pegar en el chat nuevo, adjuntando este documento completo.

```
Actúa como arquitecto de software senior especializado en Flutter, Node.js/Go,
PostgreSQL+PostGIS y sistemas de movilidad y logística.

Te adjunto el documento de especificación completa del proyecto "Moti": una
plataforma de intermediación tecnológica (EULA / licencia de uso comercial, NO
empresa de transporte) para el nodo fronterizo Leticia (Colombia) – Tabatinga
(Brasil) y la logística fluvial del río Amazonas hacia Tarapacá, La Chorrera y
Puerto Nariño.

REGLAS DE TRABAJO — obligatorias:
1. Este documento es la ÚNICA fuente de verdad. No inventes requisitos,
   funcionalidades, cifras ni cláusulas que no estén en él.
2. Las secciones 1 a 17 son el registro histórico del diseño y conservan marcas
   [PENDIENTE] que YA FUERON RESUELTAS. La Sección 19 contiene la resolución de
   los 34 pendientes y MANDA sobre cualquier contradicción con las secciones
   anteriores. Las secciones 20 y 21 contienen los textos legales definitivos.
3. No queda ningún punto abierto por decidir. Si detectas un vacío real, no lo
   rellenes por tu cuenta: pregúntame.
4. Mantén un tono estrictamente técnico, profesional y neutro. Sin jerga, sin
   modismos, sin regionalismos, sin trato informal.
5. No cierres ni des por terminada una fase antes de que yo lo indique.
   Si te pido lluvia de ideas, no saltes a conclusiones ni a entregables.
6. Respeta las decisiones tomadas y las alternativas descartadas de las
   Secciones 15 y 19. No propongas de nuevo lo que ya fue rechazado.
7. Prioridad de diseño del fundador: automatización total, cero desgaste
   administrativo, cero soporte humano, transparencia absoluta para el usuario
   y reducción del esfuerzo físico de los operadores.
8. Respeta el alcance por fases de la Sección 19.5. No metas en la Fase 1
   funcionalidades marcadas como Fase 2 o Fase 3.

PRIMER PASO:
Lee el documento completo y devuélveme una verificación de control con:
(a) resumen de los módulos detectados y su fase asignada,
(b) el stack tecnológico,
(c) las decisiones de la Sección 19 que dependen de validación externa
    (abogado, contador, cotización de proveedores),
(d) cualquier contradicción o vacío que detectes entre secciones.

No implementes ni diseñes nada todavía. Después de esa verificación,
trabajaremos por partes en el orden que yo te indique. Los dos entregables
inmediatos disponibles son:
  1) Esquema Técnico de Base de Datos Relacional (tablas, llaves primarias,
     campos cifrados AES-256, llaves geográficas de PostGIS).
  2) Documento de Requerimientos de Software (SRS) con el User Flow textual
     detallado de los 5 actores.
Pregúntame con cuál inicio.
```

---

## 19. CIERRE DE LOS 34 PENDIENTES — DECISIONES ADOPTADAS

> **Criterio de decisión aplicado:** proteger jurídicamente a la empresa antes que maximizar ingresos, mantener la promesa de "cero desgaste administrativo", y sacar la Fase 1 lo más rápido posible para ganarle el terreno a Leticia Express.
>
> **Advertencia obligatoria:** los puntos marcados con 🔴 requieren validación de un profesional (abogado comercial colombiano, contador, o cotización formal de proveedores) antes de operar. Lo aquí escrito es criterio de diseño, no asesoría legal ni financiera.

---

### 19.1 Decisiones de negocio y monetización

#### P6 — Modelo de monetización definitivo ⛔ **CORREGIDO — VER SECCIÓN 22**

> **Lo que sigue en este punto P6 quedó ANULADO.** El fundador corrigió el modelo:
> **Moti cobra únicamente a los capitanes de barco, mediante saldo prepago, y nunca
> toca el dinero del cliente.** La versión vigente está en la **Sección 22**.
> Se conserva el texto original abajo solo como registro de lo que se descartó.

~~**MIXTO POR CATEGORÍA**~~

| Categoría | Comisión Moti |
|---|---|
| Moto — pasajeros | **$500 COP fijos por carrera** |
| Motocarro — pasajeros | **$800 COP fijos por carrera** |
| Motocarga / acarreo / trasteo | **8% del valor del servicio** |
| Flete fluvial (barcos y lanchas) | **8% del valor del flete** |
| Conector de Carga (cargadores) | **0% en Fase 1** (ver P9) |
| Modo Turista | Misma comisión de la categoría usada |

**Reglas:**
- La comisión se descuenta del monedero digital al marcar el servicio como "Completado" (mecanismo ya definido en 9.2).
- **Campaña de lanzamiento: comisión 0% durante los primeros 90 días** desde la activación de cada operador. Es el instrumento para captar oferta antes de que la competencia se digitalice. El contador de 90 días es individual por operador, no global.
- **Tope de comisión en carga pesada:** el 8% se aplica hasta un tope de **$400.000 COP por envío**. Sin tope, un flete de una tonelada de cemento generaría una comisión que el comerciante no aceptaría y volvería al canal tradicional.

**Por qué no suscripción fija:** en una operación de 20–30 conductores una mensualidad de $30.000 COP produce menos de $1.000.000 COP al mes, insuficiente para sostener servidores, APIs y desarrollo. Además obliga a cobrar por adelantado a gente que aún no confía en la app.

**Por qué valor fijo en pasajeros y no porcentaje:** las carreras urbanas son de $4.000–$6.000 COP; un porcentaje sería irrisorio de calcular y el conductor percibe mejor "me cuesta $500 la carrera" que "me quitan el 10%".

🔴 *Validar los valores con un contador una vez existan costos reales de servidores y APIs.*

---

#### P7 — Presupuesto de arranque ✅ **MVP ACOTADO: $85'000.000 – $120'000.000 COP**

Corresponde al rango del "sistema multi-ciudad escalable" ya estimado en 9.4, porque la arquitectura de geocercas dinámicas y el módulo fluvial son parte del núcleo, no un extra.

**Distribución recomendada:**
| Concepto | % aprox. |
|---|---|
| Desarrollo app Flutter (3 perfiles: cliente, operador, capitán) | 40% |
| Backend, base de datos y APIs | 30% |
| Dashboard Web de administración | 12% |
| Integraciones (Nequi, Pix, WhatsApp Business, DIAN, clima) | 10% |
| Pruebas, sandbox y beta cerrado | 8% |

**Reserva operativa aparte:** mínimo **$15'000.000 COP** para los primeros 6 meses de servidores, cuenta de Google Play ($25 USD única vez), Apple ($99 USD anuales), fondo de reserva para retiros 24/7 y captación en tierra.

🔴 *Es una estimación de referencia derivada de la conversación. Debe reemplazarse por cotizaciones formales de al menos 3 proveedores.*

---

#### P8 — Volumen de arranque ✅ **20–30 operadores terrestres, 3–5 embarcaciones, 2 cuadrillas**

Composición objetivo antes del lanzamiento público:
- **20–30 conductores terrestres** repartidos así: 15 motos, 8 motocarros, 7 motocargas.
- **3–5 embarcaciones** con rutas activas a Puerto Nariño, Tarapacá y La Chorrera.
- **2 cuadrillas de cargadores** con sus líderes registrados.
- **10–15 comercios ancla** (depósitos, graneros, ferreterías) preinscritos en el Portal Web.

**Regla de densidad:** no se abre la app al público hasta tener **mínimo 15 operadores terrestres activos simultáneamente en horario diurno**. Por debajo de ese umbral, el usuario pide un servicio y no aparece nadie, lo que quema la app de forma irreversible en un pueblo pequeño donde todo se sabe por voz a voz.

---

#### P9 — Modelo de coteros ✅ **MARKETPLACE SIN RECAUDO**

- La negociación de la tarifa **sí ocurre dentro de la app** (oferta y contraoferta, tal como se aprobó en 4.7). Se conserva el valor principal: el cliente sabe el precio antes de mandar la mercancía al muelle.
- **El pago se realiza en efectivo directamente al Líder de Cuadrilla en el muelle.** Moti no recauda, no retiene, no dispersa y no cobra comisión sobre ese dinero en la Fase 1.
- La app **registra el monto pactado** en el manifiesto para trazabilidad y para el desglose transparente de la cotización, con la etiqueta `[COTERO — PAGO DIRECTO EN MUELLE]`.
- Se mantiene el aviso obligatorio en pantalla del texto ya redactado en 4.7 ("Nota sobre el muelle...").

**Por qué:** recaudar y dispersar dinero de cuadrillas informales convierte a Moti en intermediario financiero de un gremio no formalizado, con riesgo de disputas y de que un juez interprete que existe subordinación. Negociar sin recaudar captura el 90% del beneficio con el 10% del riesgo.

**Migración a Fase 3:** cuando Moti mueva volumen relevante y los líderes tengan cuenta bancaria formalizada, se habilita el pago digital con comisión del 5%.

---

#### P10 — Valor de la liga del ayudante ✅ **$20.000 COP**

Valor fijo, mostrado siempre desglosado. Se descarta el valor de $15.000 COP citado antes.

**Regla adicional:** el valor es **configurable desde el Dashboard** por si la realidad de la calle obliga a ajustarlo, pero es **único y estandarizado** — el conductor no puede modificarlo por su cuenta, porque eso reabre la negociación en la calle que la app vino a eliminar.

---

#### P11 — Horario del recargo nocturno ✅ **8:00 PM – 5:00 AM**

- Valor: **+$2.000 COP** en moto de pasajeros, **+$3.000 COP** en motocarro y en servicios de carga terrestre.
- Se calcula por la **hora de solicitud del servicio**, no por la hora de finalización, para que el precio mostrado nunca cambie a mitad del viaje.
- Configurable desde el Dashboard (horario y valores).

---

#### P12 — Cobro extra por carga frágil ✅ **SIN COBRO EXTRA**

La casilla "Mercancía Frágil" **es gratuita** y solo genera la alerta amarilla en el manifiesto del capitán.

**Por qué:** cobrar un adicional por "cuidado especial" equivale a **vender una garantía sobre la mercancía**, lo que contradice frontalmente la cláusula de Limitación de Responsabilidad (10.9) y le daría a un demandante el argumento de que Moti sí asumió un deber de custodia pagado. El beneficio económico es marginal; el riesgo legal es estructural.

---

#### P13 — Automatización de la Moti-Tasa ✅ **PROMEDIO COLABORATIVO CON RESPALDO MANUAL**

**Algoritmo definitivo:**
1. Cada mañana, los **primeros 10 operadores** (mototaxistas o capitanes) que inicien sesión reciben la pregunta: *"¿A cómo estás recibiendo el Real hoy?"*.
2. El sistema **descarta el valor más alto y el más bajo** y promedia los 8 restantes.
3. Al promedio se le aplica un **margen de protección del 3% a favor del operador** (si el promedio es 6.20, la app calcula a 6.01).
4. **Banda de control:** si el promedio resultante se desvía más de un **10%** respecto de la tasa del día anterior, el sistema **no la aplica**, mantiene la anterior y envía una alerta al Dashboard para revisión manual. Esto bloquea manipulaciones coordinadas entre conductores.
5. **Respaldo:** si antes de las 9:00 AM no hay al menos 6 reportes válidos, se mantiene la última tasa vigente y el administrador puede sobrescribirla manualmente desde el Dashboard en cualquier momento.
6. Se conserva el aviso en pantalla: *«Precios de referencia. El pago final se pacta directamente con el conductor según la tasa local aceptada»*.

**Por qué no scraping:** depende de que terceros mantengan su web o su Facebook publicando; el día que cambien el formato, la tasa se congela sin que nadie se entere.
**Por qué no TRM menos margen:** el propio fundador demostró que la TRM oficial no refleja el mostrador de Leticia.

---

### 19.2 Decisiones de operación y registro

#### P14 — Registro por fases con plazo para documentos ✅ **NO SE IMPLEMENTA**

**SOAT y Revisión Técnico-Mecánica vigentes son obligatorios desde el minuto uno.** Sin ellos, la cuenta no se activa. Sin excepciones ni plazos de gracia.

**Por qué:** ya está documentado en el propio análisis legal del proyecto (12.4) que *"si ocurre un accidente y la app permitió trabajar a una moto sin SOAT, la empresa sí podría ser vinculada legalmente por negligencia"*. Un plazo de 30 días es exactamente la ventana en la que ocurre ese accidente. Es el único riesgo del proyecto capaz de tumbar la empresa entera.

**Compensación para no frenar la captación:** en la fase de reclutamiento en tierra, Moti acompaña al conductor a poner sus papeles al día (indicándole dónde y cuánto cuesta), y le garantiza los **90 días sin comisión** desde el día que active la cuenta, no desde el día que se inscribió.

---

#### P15 — Verificación de antecedentes ✅ **MANUAL EN FASE 1, AUTOMATIZADA EN FASE 3**

- **Fase 1 y 2 (hasta 200 operadores):** revisión manual desde el Dashboard. El operador sube cédula y el administrador consulta los portales de Policía, Contraloría y Procuraduría. Con 20–30 conductores es cuestión de minutos y evita el costo de una integración.
- **Registro obligatorio:** el resultado y la fecha de cada verificación quedan guardados en la ficha del operador, con la captura del certificado. **Ese registro es la prueba de diligencia** ante una eventual demanda por omisión de control.
- **Reverificación:** cada **12 meses**, automática por calendario. Si vence, la cuenta se pausa.
- **Fase 3 (más de 200 operadores):** automatización por consulta programada o proveedor de verificación de antecedentes.

---

#### P16 — Declaración de monedas del cliente ✅ **NO SE PIDE AL REGISTRARSE**

El cliente **elige el método de pago libremente en cada servicio**. El filtro de compatibilidad (4.27) se aplica con esa selección puntual.

**Por qué:** obligar a declarar monedas en el registro añade fricción en el momento más frágil del embudo (la primera apertura de la app) para resolver un problema que se resuelve solo, un viaje a la vez.

---

#### P17 — Algoritmo de asignación ✅ **GEOGRÁFICO CON REGLA DE EQUIDAD**

1. **Base:** asignación al operador **disponible más cercano** (ya definido en 4.2).
2. **Regla de equidad ("anti-monopolio de esquina"):** si un operador lleva **más de 45 minutos conectado y disponible sin recibir una sola oferta**, entra en un **estado de prioridad**. La siguiente solicitud dentro de un radio de **2 km** se le asigna a él primero, aunque no sea el más cercano.
3. El estado de prioridad se consume al aceptar un servicio o al desconectarse.
4. Umbral y radio configurables desde el Dashboard.

**Por qué:** la asignación puramente geográfica produce el monopolio de las esquinas frente a los depósitos grandes, ya identificado en la conversación. Una fila virtual pura, en cambio, mandaría a un conductor de un extremo de Leticia al otro solo por turno, quemando gasolina y tiempo. El híbrido corrige la inequidad sin romper la eficiencia.

---

### 19.3 Decisiones legales y societarias

#### P18 — Constitución societaria ✅ **S.A.S. — SÍ** 🔴

Constituir **Sociedad por Acciones Simplificada (S.A.S.)** en la Cámara de Comercio del Amazonas antes del lanzamiento público.

**Razón:** separa el patrimonio personal del fundador del riesgo de la operación. Todos los textos de los T&C ya redactados (Sección 10) presuponen una persona jurídica ("Moti S.A.S.") como titular de la licencia de software. Sin la sociedad constituida, las cláusulas de exclusión de responsabilidad protegen a nadie.

🔴 *Trámite y estatutos a cargo de un abogado comercial colombiano.*

---

#### P19 — Póliza de Responsabilidad Extracontractual ✅ **COTIZAR YA, CONTRATAR EN FASE 3** 🔴

- **Fase 1 y 2:** no se contrata. El costo no se justifica con volumen bajo, y el blindaje contractual (Sección 10) es el escudo primario.
- **Acción inmediata:** cotizarla desde ya con aseguradoras locales para conocer el número y poder proyectarlo.
- **Disparador de contratación:** al superar **1.000 servicios mensuales** o al abrir la segunda ciudad, lo que ocurra primero.
- **Nunca se publicita al usuario.** Anunciar una póliza equivale a prometer cobertura y erosiona la posición de "intermediario sin responsabilidad".

---

#### P20 — Figura contractual principal ✅ **AMBAS, SEGÚN EL SERVICIO**

| Servicio | Figura contractual |
|---|---|
| Carga, mercancía, mandados, domicilios, acarreos, fluvial | **Contrato de Mandato / Corretaje — servicio de mensajería y logística de terceros** (Código de Comercio) |
| Transporte de personas (moto, motocarro) | **Contrato de Arrendamiento de Vehículo con Conductor** (Código Civil) |
| Todos | Sobre ambos opera el **EULA / Licencia de Uso de Software** como contrato marco con Moti |

**Posicionamiento público y de marca:** Moti se presenta ante el mercado, la publicidad, la alcaldía y las autoridades **como plataforma de mensajería, mandados y logística** — el escudo más fuerte identificado en la conversación. El transporte de personas se documenta como una funcionalidad secundaria de movilidad compartida entre particulares.

**Regla de lenguaje (ya definida en 10.14, ahora obligatoria en el código):** el diccionario de textos de la app **no puede contener** las palabras "taxi", "tarifa de transporte", "servicio de transporte" ni "pasaje". Se usa "Aporte sugerido", "Costo de intermediación", "Servicio de mensajería", "Conductor colaborador". **Debe existir una prueba automatizada en el pipeline que falle el build si alguna de las palabras prohibidas aparece en los archivos de texto de la interfaz.**

🔴 *Redacción final de ambos contratos a cargo de un abogado comercial colombiano.*

---

### 19.4 Veredicto sobre las funcionalidades propuestas

| # | Funcionalidad | Veredicto | Fase | Motivo |
|---|---|---|---|---|
| Idea 2 | Seguro de carga "Moti-Protege" ($5.000 COP) | ❌ **DESCARTADA** | — | Contradice frontalmente la Sección 10.9. Vender un seguro es asumir responsabilidad sobre la mercancía |
| Idea 3 | Notas de voz en el chat | ✅ **APROBADA** | 1 | Ya está en 4.8; es el canal natural de la región |
| Idea 3b | SMS automáticos desde el servidor | ❌ **DESCARTADA** | — | Riesgo de inyección y sanción SIC (4.35) |
| Idea 5 | Botón "Moti-S.O.S." | ✅ **APROBADA CON LÍMITE** | 2 | Envía ubicación GPS al Dashboard y a **un contacto de emergencia registrado por el propio operador**. Moti **no promete rescate ni coordina auxilio** — prometerlo genera deber de socorro |
| Idea 7 | Bloqueo de zonas/categorías por horario | ✅ **APROBADA** | 2 | Reutiliza el módulo de zonificación de riesgo del Dashboard (4.41); costo marginal |
| Idea 9 | "Moti-Padrino" (referidos) | ✅ **APROBADA** | 2 | Motor de viralización en pueblo pequeño. **Premio: 15 días sin comisión** para el padrino cuando el referido complete 10 servicios. Nunca dinero en efectivo |
| Idea 10 | Estrellas turísticas con prioridad | ❌ **DESCARTADA** | — | El ranking general ya premia al buen operador. Un ranking paralelo por nacionalidad del cliente es complejidad sin retorno |
| Idea 11 | "Moti-Colectivo" (viaje compartido) | ❌ **DESCARTADA (Fase 1–3)** | — | Multiplica los casos borde de tarifa, cancelación y responsabilidad. Reevaluar solo si aparece demanda real |
| Idea 15 | Foto de la báscula en la entrega | ✅ **APROBADA** | 1 | Costo casi nulo, y es prueba documental que protege a Moti y al capitán en disputas por peso |
| Idea 19 | "Moti-Sello" (QR físico en cajas) | ✅ **APROBADA** | 2 | Requiere impresoras térmicas; sin ellas la Fase 1 opera con el código de manifiesto en pantalla |
| Idea 22 | Filtro de paso fronterizo nocturno | ✅ **CERRADO** | 1 | Ya resuelto por la Soberanía de Placas (4.30) más el aviso de cruce internacional |
| Idea 23 | "Moti-Bilingüe" | ✅ **APROBADA SIN SOBRECOSTO** | 2 | Casilla de idiomas en el registro del operador (portugués / inglés) y filtro opcional para el cliente. **Sin tarifa diferenciada** — cobrar más al extranjero por el mismo trayecto es exactamente el "tumbazo" que la app vino a eliminar |
| P27 | Etiquetas rápidas de calificación | ✅ **APROBADA** | 1 | Barato y mejora la calidad del dato. Etiquetas: conductor → "Buen manejo", "Puntual", "Casco limpio", "Cuidó la carga"; cliente → "Amable", "Puntual", "Pagó sin problema" |
| P28 | Venta del panel a agencias del muelle | ❌ **DESCARTADA** | — | Convertiría a Moti en proveedor de software para su propia competencia. El Portal Web mayorista (4.38) ya cubre a ese cliente **dentro** del ecosistema |
| P29 | Categoría "Moti-Turismo" con tarifa más alta | ❌ **DESCARTADA** | — | Sustituida por la casilla bilingüe sin sobrecosto (Idea 23) |
| P30 | Almacenes con Moti como transportador oficial | ⛔ **DESCARTADA** — sustituida por "favoritos" | 2 | Moti no designa transportadores: el usuario elige. Lo único que se construye es una lista de favoritos o "el de siempre" para repetir operador en un toque. Es el usuario eligiendo más rápido, no la plataforma nombrando a nadie |
| P31 | Pix con QR Dinámico (Cobro Inmediato) | ✅ **APROBADA** | 1 | Es el equivalente exacto de Nequi Push del lado brasileño. Sin él, Tabatinga queda en desventaja funcional |
| P32 | Trazabilidad como prueba legal | ✅ **APROBADA** | 1 | La bitácora GPS, el manifiesto, el chat y el log de aceptación de T&C ya se almacenan. Se añade **exportación en PDF de la trazabilidad completa de un servicio** desde el Dashboard, para entregar a autoridades |
| P32b | Canal de soporte | ✅ **ASÍNCRONO ÚNICAMENTE** | 1 | Formulario dentro de la app + centro de ayuda con preguntas frecuentes. **Sin línea telefónica ni chat en vivo**, coherente con "cero desgaste". SLA declarado: respuesta en 48 horas hábiles |

---

### 19.5 Alcance por fases (consolidado)

**FASE 1 — MVP de lanzamiento (Leticia + Tabatinga + fluvial básico, solo Android)**
Transporte de personas (moto, motocarro) · Motocargas con ayudante · Restricción de muelle · Soberanía de placas · Recargo nocturno · Marketplace de cargadores sin recaudo · Módulo fluvial completo (manifiesto, aforo, toneladas, multiplicador de piezas, Starlink, predicción, geocerca de aproximación) · Modelo triangular · Token OTP · Pago en Origen/Destino · Pago obligatorio antes de arrancar · Efectivo, Nequi, Nequi Push, Pix, Pix QR Dinámico · Billetera y retiros 24/7 · Moti-Tasa colaborativa · Modo offline y sincronización diferida · Registro seguro por WhatsApp Business API · Modo Turista · Estrellas y etiquetas rápidas · Moti-Clima · Foto de báscula · Dashboard Web · Soporte asíncrono · Exportación de trazabilidad · QR del aeropuerto.

**FASE 2 — Consolidación (mes 4 al 9)**
iOS · Portal Web mayorista · Moti-Alerta completo (PARES, reportes viales, caducidad 60 min) · Moti-Padrino · Moti-S.O.S. · Moti-Sello QR físico · Moti-Bilingüe · Bloqueo de zonas por horario · Lista de operadores favoritos ("el de siempre").

**FASE 3 — Escala (mes 10 en adelante)**
Segunda y tercera ciudad por geocercas · Pago digital al Líder de Cuadrilla con comisión del 5% · Verificación automatizada de antecedentes · Póliza de responsabilidad extracontractual · Evaluación fiscal formal de la operación brasileña.

---

### 19.6 Identidad visual (P33) ✅ **DEFINIDA**

| Elemento | Valor |
|---|---|
| **Primario — Verde Río** | `#0B6E5E` — botones principales, barra de navegación, estado "en curso" |
| **Secundario — Ámbar Motocarro** | `#F2A33C` — acciones secundarias, destacados, marca del gremio |
| **Éxito** | `#1E9E5A` — pago confirmado, entrega cerrada |
| **Advertencia** | `#E8A33D` — carga frágil, documentos por vencer |
| **Alerta crítica** | `#FF0000` — **reservado en exclusiva** para la alerta de PARE y el estado "POR COBRAR". No usarse en ningún otro contexto |
| **Fondo claro** | `#F5F7F6` |
| **Texto / fondo oscuro** | `#101418` |
| **Tipografía** | **Inter** (licencia libre, alta legibilidad en pantallas de gama baja y bajo sol directo) |
| **Tamaño mínimo de texto en pantallas de conducción** | 18 sp |
| **Tamaño mínimo de área táctil** | 48 × 48 dp (uso con guantes de moto) |

**Concepto de logotipo:** monograma "M" construido con una rueda y una onda de río, en Verde Río sobre fondo claro y en Ámbar sobre fondo oscuro. Debe ser legible a 24 px (icono de app) y en impresión monocroma sobre el sticker QR del aeropuerto.

**Modo oscuro obligatorio** en las pantallas de conducción, para operación nocturna.

---

### 19.7 Estrategia de lanzamiento (P34) ✅ **DEFINIDA**

**Etapa 0 — Preparación legal y societaria (antes de escribir código de producción)**
Constitución de la S.A.S. · Redacción final de T&C y Política de Privacidad por abogado · Registro de la marca Moti · Apertura de la cuenta empresarial y de la cuenta Nequi de recaudo.

**Etapa 1 — Captación en tierra (paralela al desarrollo)**
- Recorrido puerta a puerta con los **líderes de cuadrilla del muelle** y los **capitanes de las 3–5 embarcaciones** de mayor frecuencia. Argumento: la app les lleva trabajo coordinado y elimina la discusión de precios en la orilla.
- Recorrido por los puntos de espera de motocargas y por los depósitos y graneros del centro.
- **Oferta de enganche: 90 días sin comisión** y acompañamiento para poner los papeles al día.
- Meta: 20–30 operadores terrestres, 3–5 embarcaciones, 2 cuadrillas, 10–15 comercios ancla.

**Etapa 2 — Sandbox técnico**
100 viajes simulados a las 2:00 AM, con cancelaciones, pérdidas de señal en el cruce fronterizo y cargas ficticias por toneladas (ya definido en 13.5).

**Etapa 3 — Beta cerrado, una semana**
5 mototaxistas + 2 motocargas con ayudante + 1 capitán conocido. Operación oculta, corrección en caliente.

**Etapa 4 — Lanzamiento público**
- Despliegue de stickers QR en el Aeropuerto Alfredo Vásquez Cobo, el muelle turístico, el muelle de carga y los comercios ancla.
- Activación del bucle viral del destinatario (4.36) desde el día uno: es el canal de adquisición principal y no cuesta dinero.
- **No se lanza sin cumplir la regla de densidad de P8** (mínimo 15 operadores terrestres activos en simultáneo).

**Indicadores de control (revisión semanal en el Dashboard):**
Operadores activos diarios · Servicios completados · Tiempo promedio de asignación · Tasa de cancelación · % de pagos digitales sobre el total · Comisión retenida · Destinatarios convertidos en usuarios registrados.

---

### 19.8 Entregables técnicos (P1–P5) — no son decisiones, son ejecución

| # | Entregable | Estado |
|---|---|---|
| 1 | Documento de Requerimientos de Software (SRS) / User Flow de los 5 actores | Pasa al proyecto nuevo |
| 2 | Esquema de Base de Datos Relacional (PostgreSQL + PostGIS, AES-256) | Pasa al proyecto nuevo |
| 3 | Diagrama de flujo lógico de la aplicación | Pasa al proyecto nuevo |
| 4 | Dashboard Web de administración | Fase 1 de desarrollo |
| 5 | Código fuente | Fase 1 de desarrollo |

**Orden recomendado de ejecución:** Esquema de Base de Datos → SRS/User Flow → Diagrama de flujo → Código. La base de datos primero, porque el modelo triangular, las geocercas y los monederos condicionan todas las pantallas.

---

### 19.9 Materia tributaria (P24 y P25) 🔴

**Colombia — DIAN**
- La S.A.S. factura **únicamente su comisión por licencia de uso de software**, no el valor del flete ni de la carrera. El dinero del servicio pertenece al operador independiente; Moti solo lo transporta operativamente en el caso de los pagos digitales.
- Esta distinción es **crítica**: facturar el flete completo convertiría a Moti en prestador del servicio de transporte y destruiría toda la arquitectura legal de la Sección 10.
- La comisión por licenciamiento de software es un ingreso gravado con IVA. La facturación electrónica ya definida (4.39) debe emitirse **sobre la comisión**, y opcionalmente generar un documento soporte del servicio del tercero.
- **ICA:** declarar en el municipio de Leticia según la actividad de servicios.
- El operador independiente es responsable de sus propios impuestos y aportes a seguridad social (ya declarado en la cláusula 10.5).

**Brasil — Receita Federal / ISS**
- La operación de Tabatinga en la Fase 1 se ejecuta desde la entidad colombiana, con las reglas fiscales de geolocalización ya definidas (4.31).
- La evaluación formal del ISS y de la eventual necesidad de una entidad brasileña se difiere a la **Fase 3**, cuando el volumen lo justifique.

🔴 *Todo lo anterior debe ser confirmado por un contador público colombiano y, para la parte brasileña, por un contador en Brasil. No es asesoría tributaria.*

---

## 20. POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES (texto completo)

> **Borrador base conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.** 🔴 Debe ser revisado y firmado por un abogado antes de publicarse. Reemplazar los campos entre corchetes.

---

**POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES — PLATAFORMA MOTI**

**1. Responsable del Tratamiento**
[RAZÓN SOCIAL] S.A.S., identificada con NIT [NÚMERO], domiciliada en [DIRECCIÓN], Leticia, Amazonas, Colombia, correo electrónico de contacto [CORREO], teléfono [TELÉFONO], es la responsable del tratamiento de los datos personales recolectados a través de la aplicación móvil Moti y sus plataformas web asociadas.

**2. Ámbito de aplicación**
La presente política aplica a todos los titulares de datos que utilicen La Aplicación en cualquiera de sus perfiles: Usuario Remitente, Usuario Destinatario, Pasajero, Conductor Colaborador, Ayudante, Líder de Cuadrilla o Conector de Carga, Capitán de Embarcación, Usuario Empresa y Usuario Temporal en Modo Turista.

**3. Datos personales que se recolectan**

3.1. **De todos los usuarios:** nombre completo, número de documento de identidad (Cédula de Ciudadanía, Cédula de Extranjería, Pasaporte o CPF), número de teléfono celular, correo electrónico, fotografía de perfil, dirección IP, identificador del dispositivo, fecha y hora de aceptación de los Términos y Condiciones.

3.2. **De los Conductores Colaboradores, Capitanes y Conectores de Carga, adicionalmente:** licencia de conducción (A2 o CNH), Seguro Obligatorio de Accidentes de Tránsito (SOAT), Certificado de Revisión Técnico-Mecánica, placa y características del vehículo o matrícula y nombre de la embarcación, certificados de antecedentes penales, fiscales y disciplinarios, número de cuenta Nequi o Llave Pix, e historial de servicios y calificaciones.

3.3. **Datos de geolocalización:** coordenadas de latitud y longitud del dispositivo, recolectadas en tiempo real durante la prestación del servicio y almacenadas como bitácora de ruta.

3.4. **Datos de las comunicaciones:** mensajes de texto, notas de voz y fotografías intercambiadas dentro del chat interno de La Aplicación.

3.5. **Datos transaccionales:** montos, métodos de pago, códigos de referencia de las transacciones, movimientos del monedero digital y órdenes de retiro.

3.6. **Datos del Usuario Temporal en Modo Turista:** imagen del pasaporte o documento de identidad, de la cual se extraen únicamente el nombre y la nacionalidad.

**4. Finalidades del Tratamiento**
Los datos son tratados exclusivamente para: (i) crear, verificar y administrar la cuenta del titular; (ii) conectar a usuarios independientes entre sí a través de la plataforma; (iii) calcular y desglosar las tarifas sugeridas; (iv) procesar los pagos, liquidar la comisión de licenciamiento y ejecutar los retiros; (v) permitir el rastreo y la trazabilidad del servicio solicitado; (vi) emitir las notificaciones de aproximación y los códigos de retiro seguro; (vii) generar la facturación electrónica cuando el usuario así lo solicite; (viii) prevenir el fraude, el hurto y el uso indebido de la plataforma; (ix) atender requerimientos de autoridades administrativas y judiciales competentes; y (x) verificar la vigencia de la documentación legal exigida a los operadores.

**5. Datos sensibles**
La Aplicación no recolecta datos sensibles en los términos del artículo 5 de la Ley 1581 de 2012. No se solicita información sobre origen racial o étnico, orientación política, convicciones religiosas o filosóficas, pertenencia a sindicatos, datos de salud, de vida sexual ni datos biométricos, salvo la fotografía de perfil, cuyo suministro es facultativo y cuya finalidad es exclusivamente la identificación visual entre las partes del servicio con fines de seguridad.

**6. Derechos del Titular**
Todo titular tiene derecho a: conocer, actualizar y rectificar sus datos personales; solicitar prueba de la autorización otorgada; ser informado sobre el uso dado a sus datos; presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley; revocar la autorización y solicitar la supresión de sus datos cuando no exista un deber legal o contractual que lo impida; y acceder de forma gratuita a sus datos personales.

**7. Procedimiento para ejercer los derechos**
Las consultas y reclamos se presentan a través del formulario de soporte disponible dentro de La Aplicación o al correo electrónico [CORREO DE PROTECCIÓN DE DATOS]. Las consultas se atienden en un término máximo de diez (10) días hábiles y los reclamos en un término máximo de quince (15) días hábiles, conforme a los artículos 14 y 15 de la Ley 1581 de 2012.

**8. Transferencia y transmisión de datos a terceros**
Para la prestación del servicio, determinados datos son transmitidos a los siguientes encargados: (i) proveedores de servicios de pago para el procesamiento de las transacciones; (ii) Meta Platforms para el envío de la plantilla de invitación por WhatsApp Business, previa verificación de un pago real; (iii) proveedores tecnológicos autorizados por la DIAN para la emisión de la factura electrónica, únicamente cuando el usuario lo solicite; (iv) proveedores de servicios meteorológicos, a los cuales se transmiten exclusivamente coordenadas geográficas sin datos identificatorios; y (v) proveedores de infraestructura en la nube para el alojamiento de la información. Moti no vende, arrienda ni cede datos personales con fines comerciales o publicitarios a terceros.

**9. Datos compartidos entre usuarios de la plataforma**
Al solicitar o aceptar un servicio, el titular autoriza expresamente que los siguientes datos sean visibles para la contraparte del servicio: nombre, fotografía de perfil, número de documento de identidad, calificación promedio, y en el caso de los operadores, los datos del vehículo o embarcación. El número de teléfono personal no se revela; la comunicación se realiza a través del chat interno de La Aplicación.

**10. Conservación y supresión de los datos**
Los datos se conservan mientras la cuenta permanezca activa y, tras su desactivación, por el término necesario para atender obligaciones legales, contables y tributarias. En particular:
(i) el perfil del **Usuario Temporal en Modo Turista** se archiva automáticamente y **la imagen de su pasaporte o documento de identidad se elimina de forma definitiva a los treinta (30) días** de inactividad desde la región de Leticia y Tabatinga;
(ii) los números de teléfono de destinatarios no registrados se almacenan en una tabla temporal aislada y **se eliminan automáticamente a las cuarenta y ocho (48) horas** si el titular no completa su registro;
(iii) las bitácoras de geolocalización se conservan por [PLAZO A DEFINIR POR EL ABOGADO] con fines de trazabilidad y prueba.

**11. Medidas de seguridad**
La información se transmite mediante protocolos cifrados SSL/TLS y los datos sensibles —incluidos números de teléfono, cuentas Nequi, Llaves Pix y documentos— se almacenan cifrados con el algoritmo AES-256. El acceso a la información está restringido al personal autorizado y registrado.

**12. Autorización**
La autorización para el tratamiento de datos se obtiene mediante casilla de verificación no premarcada durante el registro, cuya activación es requisito indispensable para el uso de La Aplicación. El sistema conserva como prueba la fecha, la hora y la dirección IP de la aceptación.

**13. Vigencia**
La presente política rige a partir del [FECHA] y sustituye cualquier versión anterior. Las modificaciones serán comunicadas a los titulares a través de La Aplicación con al menos diez (10) días de antelación.

---

## 21. CLÁUSULAS DE FRONTERA — TEXTO LITERAL

> **Borradores base.** 🔴 Deben ser revisados y ajustados por un abogado comercial colombiano antes de publicarse. Se incorporan a los Términos y Condiciones de la Sección 10.

### 21.1 Cláusula de Control de Contrabando y Mercancías Prohibidas

> **CLÁUSULA DE MERCANCÍAS PROHIBIDAS Y CUMPLIMIENTO ADUANERO.** El Usuario declara y garantiza que los bienes registrados en La Aplicación son de su legítima propiedad o disposición, que su origen y destino son lícitos y que cuenta con la documentación exigida por la normatividad aduanera aplicable al régimen especial de la región y al transporte fluvial y terrestre en zona de frontera.
>
> Queda expresa y absolutamente prohibido el uso de La Aplicación para coordinar, solicitar, transportar o gestionar: sustancias estupefacientes, psicotrópicas o sus precursores químicos; armas, municiones o explosivos; combustibles, licores, cigarrillos o cualquier mercancía introducida al país en contravención del régimen aduanero; fauna, flora o especímenes de comercio restringido; material que involucre la explotación de personas; y cualquier otro bien cuya tenencia, comercialización o transporte se encuentre prohibido o restringido por la legislación de la República de Colombia o de la República Federativa de Brasil.
>
> El Licenciante no realiza inspección, apertura, aforo ni verificación de ninguna clase sobre el contenido de los bultos, cajas, embalajes o cargamentos registrados por los Usuarios, y carece de capacidad material para hacerlo. En consecuencia, en caso de aprehensión, decomiso, retención o inmovilización de mercancías, vehículos o embarcaciones por parte de la Dirección de Impuestos y Aduanas Nacionales (DIAN), la Policía Fiscal y Aduanera (POLFA), la Fuerza Pública o cualquier autoridad de control colombiana o brasileña, **el Usuario Remitente asume de forma exclusiva y total la responsabilidad penal, civil, administrativa y aduanera derivada**, y mantendrá completamente indemne al Licenciante, a sus socios, administradores y empleados frente a cualquier reclamación, sanción, multa, costo o gasto de defensa.
>
> El Usuario autoriza de forma expresa e irrevocable al Licenciante para poner a disposición de la Fiscalía General de la Nación, de las autoridades aduaneras y de cualquier autoridad judicial o administrativa competente, sin necesidad de requerimiento previo al Usuario, la totalidad de la información de registro asociada a la operación investigada, incluyendo nombre, documento de identidad, número de contacto, dirección IP, bitácora de geolocalización, manifiesto digital, registros de pago e historial de comunicaciones sostenidas dentro de La Aplicación.

### 21.2 Cláusula de Ley Aplicable y Jurisdicción

> **LEY APLICABLE Y JURISDICCIÓN COMPETENTE.** El presente contrato se rige por la ley del territorio en el cual se origina la solicitud del servicio, determinada por las coordenadas de geolocalización registradas por La Aplicación al momento de generarse la orden.
>
> Los servicios originados en territorio de la República de Colombia se rigen por la legislación civil, comercial y de protección al consumidor colombiana, y cualquier controversia derivada de ellos será sometida a la jurisdicción de los jueces competentes del municipio de Leticia, Departamento del Amazonas, República de Colombia, renunciando las partes a cualquier otro fuero que pudiera corresponderles.
>
> Los servicios originados en territorio de la República Federativa de Brasil se rigen por el Código Civil brasileño y la legislación aplicable a las plataformas digitales de intermediación en ese país, en lo que resulte pertinente.
>
> En todo caso, las controversias relativas a la validez, interpretación, ejecución o terminación del **Contrato de Licencia de Uso de Software celebrado con el Licenciante** —con independencia del territorio donde se haya originado el servicio— se someten exclusivamente a la legislación colombiana y a la jurisdicción de los jueces del domicilio principal del Licenciante.
>
> Las partes acordarán de buena fe una etapa previa de arreglo directo con una duración máxima de treinta (30) días calendario antes de acudir a la jurisdicción ordinaria.

### 21.3 Cláusula de Caso Fortuito y Fuerza Mayor Fluvial

> **CASO FORTUITO Y FUERZA MAYOR EN LA OPERACIÓN FLUVIAL Y TERRESTRE.** Las partes reconocen expresamente que la operación de transporte en la cuenca amazónica se desarrolla en condiciones geográficas y climáticas de riesgo inherente y no controlable.
>
> El Licenciante no asume responsabilidad patrimonial alguna, directa ni indirecta, por la pérdida, avería, deterioro, mojadura, hundimiento, demora, encallamiento o destrucción total o parcial de mercancías, ni por lesiones o fallecimiento de personas, cuando tales hechos tengan origen en circunstancias constitutivas de caso fortuito o fuerza mayor, incluyendo de manera enunciativa y no taxativa: palizadas y troncos flotantes; crecientes, vaciantes o variaciones extremas del nivel de los ríos; bancos de arena y modificaciones del cauce; tormentas, vendavales, descargas eléctricas y precipitaciones de alta intensidad; niebla o condiciones de visibilidad reducida; fallas mecánicas de la embarcación o del vehículo; cierres, bloqueos o restricciones de navegación o de tránsito dispuestos por autoridad competente; conmoción interior, asonada, actos de terrorismo o hechos de terceros ajenos a las partes.
>
> La función de La Aplicación se limita a poner en contacto a las partes y a suministrar información de geolocalización y estado de forma referencial. **El Licenciante no navega, no conduce, no opera, no custodia ni supervisa las embarcaciones o vehículos**, cuya conducción, mantenimiento, condiciones de seguridad y decisiones de navegación corresponden de manera exclusiva al Conductor Colaborador o al Capitán, quien actúa como profesional independiente y único responsable.
>
> Las estimaciones de fecha y hora de arribo suministradas por La Aplicación constituyen un cálculo referencial basado en la velocidad promedio registrada y en las paradas programadas, **no constituyen una garantía de cumplimiento de plazos** y no generan derecho a indemnización, descuento ni reembolso alguno en caso de variación.

### 21.4 Cláusula de Prohibición de Trabajo Infantil y Edad Mínima

> **EDAD MÍNIMA Y PROHIBICIÓN DE TRABAJO INFANTIL.** El uso de La Aplicación en cualquiera de sus perfiles está permitido únicamente a personas mayores de dieciocho (18) años. El registro de menores de edad está prohibido y dará lugar a la cancelación inmediata de la cuenta.
>
> El Conductor Colaborador que designe un Ayudante para las labores físicas de cargue, descargue, acarreo o trasteo declara y garantiza, bajo la gravedad del juramento, que dicha persona es **mayor de dieciocho (18) años**, y se obliga a conservar y exhibir, a solicitud del Licenciante o de autoridad competente, la copia de su documento de identidad.
>
> El Licenciante prohíbe de manera absoluta la vinculación de menores de edad a las actividades de cargue y descargue de mercancías, bultos, toneladas o piezas de cualquier naturaleza, por tratarse de labores expresamente calificadas como trabajo peligroso para menores conforme a la normatividad colombiana vigente y a los convenios internacionales ratificados por Colombia en materia de erradicación de las peores formas de trabajo infantil.
>
> La verificación por parte del Licenciante, o el reporte fundado por parte de un Usuario o de una autoridad, de la participación de un menor de edad en labores de cargue o transporte coordinadas a través de La Aplicación dará lugar a la **desactivación inmediata, definitiva e irrevocable de la cuenta del Conductor Colaborador**, sin lugar a reclamación alguna, y al reporte del hecho ante el Instituto Colombiano de Bienestar Familiar y las autoridades de trabajo competentes.
>
> El Ayudante es contratado de forma directa, civil y voluntaria por el Conductor Colaborador bajo la modalidad de jornal diario. El Licenciante no tiene vínculo laboral, contractual, de subordinación ni de aseguramiento con dicho Ayudante, siendo el Conductor Colaborador el único responsable de su seguridad, de las condiciones en que ejecuta la labor y del cumplimiento de la normatividad aplicable.

---

## 22. MODELO DE INGRESOS — VERSIÓN VIGENTE

> **Esta sección sustituye al punto P6 de la Sección 19.1, a la Sección 4.26 completa
> y a la Sección 9.** Corrección hecha por el fundador. Manda sobre todo lo anterior.

---

### 22.1 La regla de oro

> **El cliente nunca le paga nada a Moti.**
>
> Ni el que envía mercancía, ni el que recibe, ni el que se sube a una moto o a un
> motocarro. El cliente le paga el **100% del valor** directamente al operador, en
> efectivo, por Nequi o por Pix. Moti no participa en esa transacción, no la
> intermedia, no la retiene y no la ve pasar por sus cuentas.

**Consecuencia obligatoria en la interfaz:** en la pantalla del cliente **no puede
aparecer ninguna línea de Moti** en el desglose de la tarifa. Ni una comisión, ni
un "$0 incluido", ni una "licencia de software". Nada. El cliente ve lo que le
paga al capitán y punto.

---

### 22.2 Quién paga

| Actor | Paga a Moti |
|---|---|
| Cliente / remitente / destinatario / pasajero | **Nunca. Cero.** |
| Mototaxista | **No** |
| Conductor de motocarro | **No** |
| Conductor de motocarga | **No** |
| Ayudante / cargador del muelle | **No** |
| **Capitán de embarcación** | **Sí — único que paga** |

**Por qué solo los barcos:**

1. **Ahí está el dinero.** Un flete fluvial de $120.000 COP soporta una comisión sin
   que nadie lo note. Una carrera de moto de $4.000 no.
2. **Ahí está el valor real de la app.** El capitán es el único que recibe algo que
   hoy no puede comprar en ninguna parte: manifiesto digital, reservas anticipadas y
   clientes que ya saben cuándo llega. El mototaxista solo recibe un viaje más.
3. **Motos y motocargas gratis es el arma de captación.** Ese gremio se vuelve la
   base de usuarios de la app sin que usted tenga que cobrarles ni discutir con
   ellos. Y son los que llevan la carga al muelle, o sea, alimentan el negocio que
   sí paga.
4. **Son pocos y son identificables.** Cobrarle a 5 capitanes es manejable. Cobrarle
   a 300 mototaxistas, no — y menos en un pueblo donde todos se conocen y se avisan.

---

### 22.3 Cómo paga el capitán: saldo prepago

**El capitán tiene que recargar la app con dinero real para poder usarla.**

**Flujo:**

1. El capitán recarga saldo transfiriendo por **Nequi o Pix a la cuenta de Moti**, o
   en efectivo con un punto autorizado.
2. Envía el comprobante o el sistema valida la transferencia, y el saldo aparece en
   su cuenta dentro de la app.
3. **Cada vez que un cliente le reserva un cupo, se le descuenta el valor del
   servicio del saldo.**
4. Si el saldo llega a cero, **su viaje deja de aparecer en la cartelera de barcos**
   y no puede recibir nuevas reservas.
5. Los envíos ya reservados y en curso **no se afectan nunca**. Una embarcación
   navegando con carga de terceros no se bloquea por saldo — eso perjudicaría al
   cliente, que no tiene nada que ver con la deuda del capitán.

**Tarifa por envío recibido:**

| Tamaño del envío | Costo para el capitán |
|---|---|
| Hasta 500 kg cobrables | **$1.000 COP** |
| Más de 500 kg cobrables | **$5.000 COP** |

**Recarga mínima:** $20.000 COP (equivale a 20 envíos pequeños).

**Por qué valor fijo y no porcentaje:** el lanchero entiende de una "cada guía que
me entra por Moti me cuesta mil pesos". Un porcentaje lo obliga a hacer cuentas y
genera desconfianza sobre si le están cobrando bien. La legibilidad vale más que
los pesos de diferencia.

**Devolución automática:** si un envío se cancela antes de que el barco zarpe, el
valor descontado **regresa al saldo del capitán**. Él no perdió nada, y el sistema no
tiene que explicarle por qué le cobraron por un flete que no hizo.

**Campaña de lanzamiento:** los primeros **90 días son gratis** para cada capitán
desde que activa su cuenta. Se le muestra el saldo consumido en $0 para que vea
exactamente cuánto le habría costado, y así la transición al cobro no sea una
sorpresa.

---

### 22.4 Lo que este modelo elimina (y por qué es una gran noticia)

Al no tocar el dinero de nadie, **desaparece de golpe la parte más costosa, más
riesgosa y más regulada del proyecto**:

| Ya no se necesita | Por qué |
|---|---|
| Cuenta central que recibe pagos de clientes | Moti solo recibe recargas de sus propios capitanes |
| Billetera con saldo a favor del operador | El operador nunca tiene plata suya dentro de Moti |
| Retiros automáticos 24/7 | No hay nada que retirar |
| API de dispersión de fondos | No se transfiere dinero a terceros |
| Fondo de reserva en la cuenta empresarial | No hay obligación de pagar a nadie |
| Cruce de saldos por pagos en efectivo | No aplica |
| Bot de reintento de transferencias fallidas | No aplica |
| Nequi Push para cobrarle al cliente | El cliente le paga al capitán, no a Moti |

**Riesgo regulatorio:** administrar dinero de terceros es una actividad vigilada. Al
recibir únicamente pagos de sus propios clientes (los capitanes) por el uso de una
licencia de software, Moti es simplemente una empresa de software que factura un
servicio. Es la posición más limpia posible.

**Nequi Push sigue siendo útil**, pero para una sola cosa: que el capitán recargue
su saldo desde la app en un toque, en vez de transferir a mano y mandar el
comprobante. Ese sí es dinero que le pertenece a Moti.

---

### 22.5 Ingresos proyectados (referencia, no promesa)

Escenario conservador con **5 capitanes activos**:

| Variable | Valor |
|---|---|
| Envíos por viaje | 15 |
| Viajes por capitán al mes | 4 |
| Envíos mensuales totales | 300 |
| Mezcla | 80% pequeños ($1.000) + 20% grandes ($5.000) |
| **Ingreso mensual** | **$540.000 COP** |

Con **15 capitanes** y la misma mezcla: **$1'620.000 COP al mes**.

Ese es el orden de magnitud real del negocio en su primera etapa. Sirve para cubrir
servidores y empezar a devolver la inversión de tiempo — no para renunciar al empleo.
El salto viene de abrir más muelles y más ciudades con la misma base de código.

🔴 *Cifras de referencia construidas sobre supuestos. Deben reemplazarse por datos
reales apenas el piloto arroje su primer mes de operación.*

---

### 22.6 Qué cambia en el código

**En la versión 0 no se implementa nada de esto.** El piloto es gratuito: no hay
saldo, no hay cobro, no hay recargas. Construir el módulo de saldo antes de saber si
los capitanes usan la app sería exactamente el error que se quiere evitar.

**Lo único que aplica hoy** es la regla de oro: la pantalla del cliente no muestra
ninguna línea de Moti, y el texto le deja claro que le paga directo al capitán.
Eso ya está implementado.

**Para la Fase 2**, cuando haya capitanes reales usándola:
- Tablas `saldos` y `movimientos_saldo`.
- Descuento automático al confirmarse una reserva, con devolución si se cancela.
- Ocultar de la cartelera los viajes de capitanes con saldo en cero.
- Pantalla de recarga y de historial de consumo.
- Nunca bloquear un viaje que ya está en navegación.

---

## 23. FACTURACIÓN — QUÉ SE ELIMINA Y QUÉ NO SE PUEDE ELIMINAR

> Esta sección sustituye a la Sección 4.39 y a la parte de facturación de la 19.9.

---

### 23.1 Lo que se elimina: facturar el flete

**Queda fuera del producto, de forma definitiva:**

- Emitir factura electrónica al comerciante por el valor del flete fluvial.
- Emitir factura electrónica por el acarreo de una motocarga.
- Emitir cualquier documento a nombre de Moti por un servicio de transporte.
- La integración con proveedores tecnológicos autorizados por la DIAN
  (Facturatech, Siigo, Alegra) para ese fin.
- El perfil dual "usuario natural / usuario empresa" con RUT y correo de
  facturación, cuyo único propósito era este módulo.

**Razón (decisión del fundador):** una factura es la prueba documental de que
alguien vendió algo. Si Moti le factura el flete al comerciante, está
declarando por escrito y ante la autoridad tributaria que **Moti vendió el
transporte**. Eso destruye de un golpe toda la arquitectura legal de las
Secciones 10 y 21: la exclusión de responsabilidad, la naturaleza de licencia
de software y la defensa ante la Superintendencia de Transporte. Ninguna
ventaja comercial frente a Leticia Express compensa eso.

**El flete lo cobra el capitán, que es quien presta el servicio.** Si un
comerciante formal necesita soportar ese gasto, se lo pide al capitán, que es
su verdadero proveedor. Moti es ajena a esa relación.

---

### 23.2 Lo que NO se puede eliminar: facturar la licencia

Aquí está el matiz que hay que tener claro desde ahora.

**Moti sí vende algo: le vende al capitán el derecho a usar el software.** Ese
es el único ingreso de la empresa (Sección 22). El día que usted reciba la
primera recarga de saldo de un capitán, eso es un ingreso gravado y la
normatividad colombiana exige respaldarlo con un documento.

| Concepto | ¿Factura Moti? |
|---|---|
| Flete fluvial que paga el cliente | **No.** Nunca. Ese dinero no es de Moti |
| Carrera de moto o motocarro | **No.** Nunca |
| Servicio de los cargadores del muelle | **No.** Nunca |
| **Recarga de saldo del capitán** | **Sí.** Es el ingreso propio de la empresa |

**Lo importante es el concepto que va escrito en ese documento.** Nunca debe
decir "transporte", "flete" ni "servicio de carga". Debe decir algo como
**"Licenciamiento de uso de plataforma tecnológica"**. Ese texto es lo que
mantiene a Moti del lado correcto de la línea.

---

### 23.3 Cuándo aplica esto

**Hoy no aplica.** El piloto es gratuito: no hay recargas, no hay ingresos, no
hay nada que facturar. No implemente absolutamente nada de facturación en la
versión 0.

Aplica el día que cobre la primera recarga. Para entonces ya debe existir la
S.A.S. y el acompañamiento de un contador. En ese momento, lo más probable es
que ni siquiera necesite un módulo dentro de la app: con pocos capitanes, se
emite desde el software contable que use la empresa. **Construir facturación
dentro de Moti solo tendría sentido con decenas de capitanes recargando.**

🔴 *La obligación exacta, el régimen aplicable y si le corresponde factura
electrónica o documento equivalente los debe confirmar un contador público
colombiano. Esto no es asesoría tributaria.*

---

*Fin del documento — Versión 4.*
