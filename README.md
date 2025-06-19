# QR-Hop 🚀

**A lightning-fast, serverless tool to shuttle text and links between your devices using QR codes.**

Ever needed to quickly send a URL from your phone to your tablet, or a piece of text from your desktop to your phone without the hassle of messaging apps or email? QR-Hop is your private, instant bridge.


QR-Hop Demo: https://qe-hop.vercel.app

---

## ✨ Features

*   **⚡️ Blazing Fast:** Instant QR code generation and text transfer.
*   **🔒 Private & Secure:** Purely client-side. Your data is encoded directly into the URL and never touches a server. No logs, no tracking.
*   **☁️ Serverless:** No backend, no database, no sign-up required. It's just you, your devices, and the magic of the web.
*   **📱 Mobile First:** A clean, responsive, and dark-mode-friendly interface that works beautifully on phones, tablets, and desktops.
*   **🚀 One-Click Deploy:** Deploy your own private instance to Vercel in seconds.
*   **📖 Open Source:** Simple, clean code. Feel free to inspect, modify, and contribute.

## 🤔 How It Works (The "Magic")

The secret lies in using the URL's hash (`#`) to carry the data.

1.  **Sending Device:** When you input text and click "Generate", the app:
    *   Takes your text.
    *   Encodes it using Base64 to make it URL-safe.
    *   Appends the encoded string to the current URL as a hash (e.g., `https://qr-hop.vercel.app/#SGVsbG9...`).
    *   Generates a QR code for this new, data-rich URL.

2.  **Receiving Device:** When you scan the QR code:
    *   You open the page with the data already in the URL.
    *   The app's JavaScript detects the hash, decodes it from Base64, and displays the original text.

Your data travels directly from one screen to another, never being stored or processed anywhere else.

## ⚙️ How to Use

#### On the Sending Device (e.g., your iPhone):
1.  Open the QR-Hop website.
2.  Paste any text (URL, password, note) into the text area.
3.  Click the **"Generate QR Code"** button.
4.  A QR code will appear on the screen.

#### On the Receiving Device (e.g., your Android Tablet):
1.  Use your camera or a QR scanner app to scan the code displayed on the sending device.
2.  The QR-Hop website will automatically open with the text pre-filled.
3.  Click the **"Copy to Clipboard"** button. The text is now ready to be pasted anywhere!

## 🚀 Deploy Your Own

You can host your own version of QR-Hop for free with Vercel.

1.  **Fork or Clone this repository** to your GitHub account.
2.  Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
3.  Click "Add New..." -> "Project".
4.  Import your forked repository.
5.  Vercel will automatically detect the settings. Just click **"Deploy"**.

That's it! You now have your own private, secure QR-Hop service running on a personal URL.

## 🛠 Tech Stack

*   **HTML5**
*   **CSS3** (with a clean, modern, dark-mode design)
*   **Vanilla JavaScript** (No frameworks, keeping it light and fast)
*   [**qrcode.js**](https://github.com/davidshimjs/qrcodejs): A simple library for generating QR codes on the client-side.
*   **Hosted on [Vercel](https://vercel.com)**

## ⚠️ Security Considerations

While the transfer is direct and private, please be mindful of your environment:
*   **Shoulder Surfing:** Anyone who can see your screen can scan the QR code. Avoid using it for highly sensitive information in public places.
*   **Browser History:** The URL containing the encoded data might be saved in your browser history on the receiving device.

This tool is perfect for temporary or low-sensitivity data like URLs, one-time codes, and quick notes. For critical, long-term secrets, always use a dedicated password manager.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).