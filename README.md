# KaTH University - Projektuppgift DT208G - Elin Ronda

I detta projekt har jag skapat en webbplats med Angular. På webbplatsen kan man se skolans kursutbud, filtrera kurser på sökord, sortera i bokstavsordning och söka kurs utefter ämne. Man kan även lägga till kurser i sitt eget ramschema som ligger i separat undersida. I detta ramschema har man möjlighet att se totalpoäng och att ta bort kurser från sin lista.

KaTH University är ett fiktivt universitet med säte i småländska Katthult. Utformningen och tänket är kattinspirerat.

## Funktionalitet
KaTH består av dessa sidor:
- Startsida
- Kurssidan
- Ramschemasidan
- Omsidan
- 404-sidan

### Kurssidan
Här kan man:
- Se alla kurser som är hämtade via en JSON-fil
- Söka på kurskod och kursnamn
- Filtrera kurser efter ämne
- Sortera kurserna genom att man klickar på rubrikerna
- Öppna kursplanerna via en länk, som öppnas i nytt fönster
- Lägga till kurser i sitt ramschema, som finns på en annan undersida
- Se antal kurser i det aktuella urvalet

### Ramschemasidan
Här kan man:
- Se kurserna som man lagt till, designade som "kort"
- Ta bort kurser från listan i ramschemat
- Se totalt antal högskolepoäng som tillagda kurser innefattar. Detta uppdateras när man lägger till eller tar bort kurs
- Behålla sitt ramschema även när man laddar om sidan, tack vare localStorage

### 404-sidan
På denna sida finns en kort text om att man hamnat fel, och en tydlig knapp som tar en tillbaka till startsidan.

## Tekniker
Jag har byggt denna webbplats med:
- Angular
- TypeScript
- HTML
- CSS
- Angular-router
- Angular-signals
- LocalStorage
- Netlify för min publicering

## Data
Jag valde att spara ner JSON-filen lokalt på datorn, och ha den i public-mappen. Jag hämtar sedan innehållet med en service och Httpclient. Ramschemat hanterar jag i en separat service och där sparas valda kurser i en signal, samt i localStorage. Tack vare detta finns datan kvar när man laddar om sidan.

## Extra funktionalitet och design
Jag har genomfört grundfunktionerna på webbplatsen, men utöver det har jag fokuserat på en tilltalande och modern design med hjälp av CSS. Jag har tittat på olika universitets webbplatser för inspiration på innehåll och utformning, bland annat KTH, Lunds och Malmös universitet.

Webbplatsen har en grafisk profil med blåa toner, en katt-logotyp, en hero-bild som ska föreställa skolbyggnaden, faktarutor, citat och en om-sida för att få den att likna en vanlig webbplats. Jag har arbetat med grid och flex för att få en bra design.

Utöver detta är webbplatsen responsivt anpassad för mindre enheter, då jag ersätter desktop-menyn med en hamburgarmeny på skärmar mindre än 900px. Likaså har jag anpassat tabellen och tagit bort, för mig, irrelevanta kolumner i det responsiva läget för att slippa en scroll-funktion och för att få plats med det relevanta på ett tilltagande sätt.

Jag har lagt till en 404-sida som hänvisar besökaren tillbaka till startsidan.

## Services
Jag använder mig av två services: ramschema och kurser. Kursservice hämtar själva kursdatan från JSON-filen och ramschemaservice hanterar besökarens ramschema genom att lägga till kurser, kontrollera så att det inte finns dubbletter, ta bort kurser från ramschemat samt spara i localStorage.

### Installation av detta projekt
Om du vill köra detta projekt lokalt rekommenderar jag att du i terminalen kör:
- npm install
- ng serve

Och sedan öppnar http://localhost:4200/ 

#### Publicering
Jag har publicerat mitt projekt hos Netlify.
Länk till KaTH University: https://kathuniversity.netlify.app/