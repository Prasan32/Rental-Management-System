exports.query=(prefix)=>{
    return [
        `CREATE TABLE IF NOT EXISTS ${prefix}${"_"}customers(
         customer_id INT(11) AUTO_INCREMENT PRIMARY KEY,
         fullname VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(15) NOT NULL,
         identity_number VARCHAR(255) NOT NULL,
         identification_document VARCHAR(255) NOT NULL,
         address VARCHAR(255) NOT NULL,
         leases VARCHAR(255) NOT NULL,
         status BOOLEAN DEFAULT 1
        );`,
        `CREATE TABLE IF NOT EXISTS ${prefix}${"_"}propertys(
            property_id INT(11) AUTO_INCREMENT PRIMARY KEY,
            property_name VARCHAR(255) NOT NULL,
            rent INT(11) NOT NULL,
            type VARCHAR(255) NOT NULL,
            area VARCHAR(255) NOT NULL,
            security_deposit INT(11) NOT NULL,
            description TEXT NOT NULL,
            address VARCHAR(255) NOT NULL,
            property_images VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        );
        `
    ].join(' ')
}