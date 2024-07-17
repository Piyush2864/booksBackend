import { Book } from '../model/book.js';
import { uploadOnCloudinary } from '../cloud/cloudinary.js';

export const bookRegister = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const book = await Book.findOne({ name });
        if (book) {
            console.log(book)
            return res.status(400).json({
                message: "Book already present"
            });
        }

        // const bookImageLocalPath = req.files && req.files.image && req.files.image[0] ? req.files.image[0].path : undefined;
        const bookImageLocalPath = req.file?.path;

        if (!bookImageLocalPath) {
            console.log(bookImageLocalPath)
            return res.status(400).json({
                message: "Image field is required"
            });
        }

        const images = await uploadOnCloudinary(bookImageLocalPath);

        if (!images) {
            console.log(images)
            return res.status(400).json({
                message: "Image upload failed"
            });
        }

        const bookCreated = await Book.create({
            name,
            description,
            price,
            image: images?.url || ""
        });

        return res.status(201).json({
            message: "Book image uploaded successfully",
            bookCreated
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};


export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            message: "Books retrieved successfully",
            books
        });
    } catch (error) {
        console.log('Error retrieving books', error)
        return res.status(500).json({
            message: "Server error"
        });
    }
};


export const updateBooks = async (req, res)=> {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        if(!name && !description && !price) {
            return res.status(400).json({
                message: "At least one field is required to update"
            });
        }

        const book = await Book.findById(id);
        if(!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (name) book.name = name;
        if (description) book.description = description;
        if (price) book.price = price;

        const updateBooks = await book.save();
        return res.status(200).json({
            message:"Book updated successfully",
            book: updateBooks
        });
    } catch (error) {
        console.log("Error updating book:", error)
        return res.status(500).json({
            message : "Server error"
        });
    }
};


export const updateBookImage = async (req, res) => {
    try {
        const { id } = req.params;

        //find the book by id

        const book = await Book.findById(id);

        if(!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        //Check if file is uploaded
        const bookImageLocalPath = req.file?.path;
        if(!bookImageLocalPath){
            return res.status(400).json({
                message: "Image field is required"
            });
        }

        //Upload new image on cloudinary
        const images = await uploadOnCloudinary(bookImageLocalPath)
        if (!images) {
            return res.status(400).json({
                message: "Image upload failed"
            });
        }



        //Remove old image from cloudinary
        if (book.image) {
            const oldImagePublicId = book.image.split("/").pop().split('.')[0];
            await cloudinary.uploader.destroy(oldImagePublicId);
        }

        //Update book's image URL
        book.image = images.url;
        const updateBook = await book.save();

        return res.status(200).json({
            message: "Book image updated successfully",
            book:updateBook
        });
    } catch (error) {
        console.log('Error updating book image:', error)
        return res.status(500).json({
            message: "Server error"
        });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if(!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Remove image from Cloudinary if it exists
        if (book.image) {
                const oldImagePublicId = book.image.split("/").pop().split('.')[0];
                await cloudinary.uploader.destroy(oldImagePublicId);
            }

            await book.remove();

            return res.status(200).json({
                message: "Book deleted successfully"
            });

    } catch (error) {
        console.log('Error deleting books')
        return res.status(500).json({
            message: "Server error"
        });
    }
};