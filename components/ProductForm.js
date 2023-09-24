import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });

        } else {
            //create

            await axios.post('/api/products', data);

        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    async function uploadImages(ev) {
        const files = ev.target.files;
        if (files.length > 0) {
            const data = new FormData();
            for (const file of files) {

                data.append('file', file);
            }
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            console.log(res);
        }

    }
    return (

        <form onSubmit={saveProduct}>
            <h2>Nom du produit</h2>
            <input
                type="text"
                placeholder="Nom"
                value={title}
                onChange={ev => setTitle(ev.target.value)} />
            <label>
                <h2> Photos</h2>

            </label>
            <div className="mb-2">
                <label className="btn-up" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                </svg>
                    <div > Téléverser</div>
                    <input type="file" className="hidden" onChange={uploadImages} />
                </label>

                {!images?.length && (
                    <div> <h2><b>Pas d'images pour ce produit</b></h2> </div>

                )}

            </div>
            <h2>Description du produit</h2>
            <textarea
                type="textarea"
                placeholder="Description"
                value={description}
                onChange={ev => setDescription(ev.target.value)} />
            <h2>Prix (en euros)</h2>
            <input
                type="number"
                placeholder="Prix"
                value={price}
                onChange={ev => setPrice(ev.target.value)} />
            <button className="btn-primary" type="submit">Enregistrer
            </button>
        </form>

    );

}