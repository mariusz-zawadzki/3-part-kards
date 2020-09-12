import React from 'react'
import {getLanguagePdf} from '../pdf/language-cards-pdf'

const ReleaseNotes = () => (
    <div className="p-3">
        <h1>Lista zmian:</h1>
        <div className="pb-3">
            <ul>
                <li className="pb-3">
                    25.08.2018
                    <ul>
                        <li>Nowe narzędzie do kadrowania w zakładcie 'Karty trójdzielne'</li>
                        <li>Możliwość ustawienia dokładnego przybliżenia przez skopiowanie go z poprzedniej edycji
                            pliku.
                        </li>
                    </ul>
                </li>
                <li className="pb-3">
                    29.08.2018
                    <ul>
                        <li>Nowe narzędzie do kadrowania w zakładcie 'Karty obrazkowe'</li>
                    </ul>
                </li>
                <li className="pb-3">
                    09.09.2018
                    <ul>
                        <li>Karty trójdzielne i karty obrazkowe
                            <ol>
                                <li>Możliwośc wgrywania wielu plików na raz. (nadpisuje istniejące obrazki).</li>
                                <li>Jeśli chcesz użyć opcji "Wgraj wiele plików", najlepiej umieścić wszystkie pliki w
                                    jednym folderze i potem je wgrać w ten sposób.
                                </li>
                            </ol>
                        </li>
                        <li>Karty trójdzielne
                            <ol>
                                <li><strong>Nadpisanie tytuły nazwą pliku.</strong> - zalecam nazywanie plików tak jakie
                                    mają być podpisy, oszczędzi to wtedy pracy.
                                </li>
                            </ol>
                        </li>
                    </ul>
                </li>
                <li>
                    Planowane na najbliższy czas:
                    <ul>
                        <li>Możliwość zapisania ustawień danego zdjęcia (przybliżenie, położenie etc.) - rozszerzenie
                            pomysłu z zapisywaniem przybliżenia, tak by można było zapisać pojedyńczy obrazek do
                            ponownej obróbki.
                        </li>
                        <li>Nowy rodzaj kart - karty językowe.
                            <button className={"btn btn-primary"} onClick={() => getLanguagePdf()} value={"PDF"}/>
                        </li>
                        <li>Nowy rodzaj kart - 'karty kontynentów'.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className="pb-3">
            Planuję w krótce zacząć znów rozwijać te narzędzia.<br/>
            Tutaj będę zamieszczał listę zmian jakie nastąpiły.
        </div>
        <div className="">
            <h5 className="card-title">W razie pytań/błędów proszę o kontakt.</h5>
            <p className="card-text">Mariusz Zawadzki</p>
            <p className="card-text">email: <a
                href="mailto:mariusz.r.zawadzki@gmail.com">mariusz.r.zawadzki@gmail.com</a></p>
            <p className="card-text">facebook: <a target="_blank" rel="noopener noreferrer"
                                                  href="https://www.facebook.com/mariusz.zawadzki.71">https://www.facebook.com/mariusz.zawadzki.71</a>
            </p>
        </div>
    </div>
);
export default ReleaseNotes;