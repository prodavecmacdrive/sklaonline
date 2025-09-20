// Script to update existing HTML pages with header/footer components
// This is a Node.js script to be run during build process

const fs = require('fs');
const path = require('path');

class PageUpdater {
    constructor() {
        this.htmlDir = path.join(__dirname, '../html');
        this.componentsDir = path.join(__dirname, '../components');
    }

    // Read component files
    readComponent(componentName) {
        const componentPath = path.join(this.componentsDir, `${componentName}.html`);
        return fs.readFileSync(componentPath, 'utf8');
    }

    // Update a single HTML file
    updateHtmlFile(filePath) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Add header placeholder after <body> tag
            content = content.replace(
                /<body[^>]*>/i,
                '$&\n    <!-- Header Placeholder -->\n    <div id="header-placeholder"></div>\n'
            );
            
            // Add footer placeholder before </body> tag
            content = content.replace(
                /<\/body>/i,
                '    <!-- Footer Placeholder -->\n    <div id="footer-placeholder"></div>\n    \n    <!-- Component Loader Script -->\n    <script src="../js/app.js"></script>\n$&'
            );
            
            // Write updated content back to file
            fs.writeFileSync(filePath, content);
            console.log(`Updated: ${path.basename(filePath)}`);
            
        } catch (error) {
            console.error(`Error updating ${filePath}:`, error.message);
        }
    }

    // Update all HTML files in the directory
    updateAllPages() {
        try {
            const files = fs.readdirSync(this.htmlDir);
            const htmlFiles = files.filter(file => 
                file.endsWith('.html') && 
                !file.includes('new') // Skip our new template files
            );

            console.log(`Found ${htmlFiles.length} HTML files to update:`);
            
            htmlFiles.forEach(file => {
                const filePath = path.join(this.htmlDir, file);
                this.updateHtmlFile(filePath);
            });
            
            console.log('All pages updated successfully!');
            
        } catch (error) {
            console.error('Error updating pages:', error.message);
        }
    }
}

// Run the updater if this script is executed directly
if (require.main === module) {
    const updater = new PageUpdater();
    updater.updateAllPages();
}

module.exports = PageUpdater;