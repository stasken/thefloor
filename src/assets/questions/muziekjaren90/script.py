import os

# Map waar je bestanden staan
map_pad = "./"  # Pas dit aan naar jouw locatie

# Outputbestand waar de tekst wordt opgeslagen
output_bestand = "output_questions.txt"

# Start index (begin met 1)
index = 1

# Lijst om de gegenereerde regels op te slaan
regels = []

# Doorloop alle bestanden in de map
for bestand in sorted(os.listdir(map_pad)):
    # Controleer of het geen map is
    if os.path.isfile(os.path.join(map_pad, bestand)):
        # Extract titel (verwijder bestandsextensie)
        titel = os.path.splitext(bestand)[0]

        # Maak de gewenste regel
        regel = (
            f'new Question("PH7wKoQ2v7gKRgkTPKcj", "", "{titel}", "muziekjaren90/{titel}", {index}, true, true),'
        )
        regels.append(regel)

        # Verhoog de index
        index += 1

# Schrijf de regels naar het outputbestand
with open(output_bestand, "w") as bestand:
    bestand.write("\n".join(regels))

print(f"{len(regels)} regels gegenereerd en opgeslagen in {output_bestand}")
