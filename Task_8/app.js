const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "books.json");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader("Content-Type", "application/json");

    // ================= GET ALL BOOKS =================
    if (method === "GET" && url === "/books") {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({
                    message: "Error reading file"
                }));
            }

            res.writeHead(200);
            res.end(data || "[]");
        });
    }

    // ================= ADD BOOK =================
    else if (method === "POST" && url === "/books") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            let newBook;

            try {
                newBook = JSON.parse(body);
            } catch (err) {
                res.writeHead(400);
                return res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));
            }

            fs.readFile(filePath, "utf8", (err, data) => {

                if (err) {
                    res.writeHead(500);
                    return res.end(JSON.stringify({
                        message: "Error reading file"
                    }));
                }

                let books = [];

                try {
                    books = data ? JSON.parse(data) : [];
                } catch {
                    books = [];
                }

                const id =
                    books.length > 0
                        ? books[books.length - 1].id + 1
                        : 1;

                const book = {
                    id,
                    title: newBook.title,
                    author: newBook.author,
                    price: newBook.price,
                    available: newBook.available
                };

                books.push(book);

                fs.writeFile(
                    filePath,
                    JSON.stringify(books, null, 2),
                    err => {

                        if (err) {
                            res.writeHead(500);
                            return res.end(JSON.stringify({
                                message: "Error writing file"
                            }));
                        }

                        res.writeHead(201);

                        res.end(JSON.stringify(book));
                    }
                );
            });
        });
    }

    // ================= DELETE BOOK =================
    else if (method === "DELETE" && url.startsWith("/books/")) {

        const id = Number(url.split("/")[2]);

        fs.readFile(filePath, "utf8", (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({
                    message: "Error reading file"
                }));
            }

            let books = JSON.parse(data || "[]");

            const index = books.findIndex(book => book.id === id);

            if (index === -1) {
                res.writeHead(404);
                return res.end(JSON.stringify({
                    message: "Book not found"
                }));
            }

            const deletedBook = books.splice(index, 1);

            fs.writeFile(
                filePath,
                JSON.stringify(books, null, 2),
                err => {

                    if (err) {
                        res.writeHead(500);
                        return res.end(JSON.stringify({
                            message: "Error writing file"
                        }));
                    }

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        message: "Book deleted",
                        book: deletedBook[0]
                    }));
                }
            );
        });
    }

    // ================= INVALID ROUTE =================
    else {
        res.writeHead(404);

        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server is running");
});