
# Clone repository.
rm -rf verbum-paper
git clone https://github.com/verbum-paper/verbum-paper.git

# Prepare directories.
cd verbum-paper
mv dependencies verbum-paper/libs
cd verbum-paper/libs

# Extract files.
unzip "ace-v1.5.3.zip"
unzip "chart.js-v3.8.0.zip"
unzip "d3-v7.4.4.zip"
unzip "function-plot-v1.22.8.zip"
unzip "highlightjs-v11.5.1.zip"
unzip "html2canvas-v1.4.1.zip"
unzip "jquery-v3.6.0.zip"
unzip "mathjax-v3.2.1.zip"
unzip "mathlive-v0.73.7.zip"
unzip "polyfill-v8.2.1.zip"

# Clean files.
rm -rf *.zip

# Download electron.
cd ../..
mkdir "electron-v18.3.0"
cd "electron-v18.3.0"
wget -c "https://github.com/electron/electron/releases/download/v18.3.0/electron-v18.3.0-linux-x64.zip"
unzip "electron-v18.3.0-linux-x64.zip"
rm -rf "electron-v18.3.0-linux-x64.zip"
cd ..

# Configure verbum-paper.sh
cd ..
echo "cd \"$(pwd)/verbum-paper\"; ./verbum-paper.sh" >> shortcut.sh
chmod +x shortcut.sh

echo "Finished <3"


