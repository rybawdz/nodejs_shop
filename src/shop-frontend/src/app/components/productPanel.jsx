'use client'

function ProductPanel({ submit }) {

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <label>
                <input type="radio" name="action" value="delete" /> Delete
            </label>
            <label>
                <input type="radio" name="action" value="add" /> Add
            </label>
            <label>
                <input type="radio" name="action" value="update" /> Update
            </label>

            <br />

            <label>
                Name:
                <input type="text" name="name" required />
            </label>

            <br />

            <label>
                Description:
                <input type="text" name="description"  />
            </label>

            <br />

            <label>
                Price:
                <input type="number" name="price"   />
            </label>

            <br />

            <label>
                Picture:
                <input type="file" name="picture" />
            </label>

            <br />

            <button type="submit" >Submit</button>
        </form>)
}

export default ProductPanel;


