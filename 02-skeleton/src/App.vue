<template>
  <div id="app">
    <!-- Toolbar -->
    <div id="toolbar">
      <button @click="readQrCode">neuen QR-Code einlesen</button>
    </div>
    <div id="qrDisplayModal" class="modal" :hidden="!showQrDisplay">
      <div class="close-modal" @click="showQrDisplay = !showQrDisplay">X</div>
      <canvas id="qrDisplay"></canvas>
      <center>
        <pre>{{contactToDisplay}}</pre>
      </center>
    </div>

    <!-- QR Reader -->
    <div id="qrReader" class="modal" :hidden="!showQrReader">
      <div class="close-modal" @click="showQrReader = !showQrReader">X</div>
      <video id="qrReaderVideo"></video>
      <canvas id="qrReaderImage" hidden></canvas>
    </div>

    <!-- Eigenes Profil -->
    <div id="profile">
      <h3>Mein Profil</h3>
      <h6>Name:</h6>
      <input type="text" placeholder="Vor- und Nachname" v-model="profile.name" />
      <h6>E-Mail Adresse:</h6>
      <input type="email" placeholder="E-Mail Adresse" v-model="profile.email" />
      <h6>Telefonnummer:</h6>
      <input type="tel" placeholder="Telefonnummer" v-model="profile.phone" />
      <canvas id="myQrDisplay"></canvas>
    </div>

    <!-- Liste von Kontakten -->
    <div id="contacts">
      <h3>Eingelesene Kontakte</h3>
      <div id="no-contacts" v-if="contacts.length == 0">Es sind noch keine Kontakte vorhanden.</div>

      <div class="contact" v-for="c in contacts" :key="c.id">
        <div class="contact-name">{{c.name}}</div>
        <div class="contact-email">{{c.email}}</div>
        <div class="contact-phone">{{c.phone}}</div>
        <div class="contact-toolbar">
          <button @click="displayQrCode(c)">Kontakt teilen</button>
          <button @click="clickDelete(c.id)">Kontakt entfernen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import md5 from 'md5';
import profileService from '@/services/profileService';
import contactService from '@/services/contactService';

export default {
  data() {
    return {
      // Booleans für die Fenster, die zwischendurch angezeigt werden
      showQrDisplay: false,
      showQrReader: false,

      // MD5-Hash des Kontaks, der angezeigt wird (nur zur Kontrolle)
      contactToDisplay: null,

      // eigenes Profil
      profile: {
        name: null,
        email: null,
        phone: null,
      },

      // Liste der gescannten Kontakte
      contacts: [],
    };
  },

  methods: {
    // über Object Destructuring werden die Funktionen der Services in methods aufgenommen
    ...contactService,
    ...profileService,

    // lädt Daten von den Services in den View
    loadData() {
      this.contacts = this.getContacts().reverse();
      this.profile = this.getProfile();
    },

    // Kontakt mithilfe des Services löschen
    clickDelete(contactId) {
      this.deleteContact(contactId);
      this.loadData();
    },

    // QR Code einlesen
    async readQrCode() {
      this.showQrReader = true;

      // TODO: hier Code aus vorigen Beispielen einfügen
    },

    async checkForQrCode(video, stream, interval) {
      // TODO: hier Code aus vorigen Beispielen einfügen
    },

    // QR-Code für Kontakt anzeigen
    displayQrCode(contact) {
      contact = JSON.stringify({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
      });

      // TODO: hier Code aus vorigen Beispielen einfügen

      this.contactToDisplay = md5(contact);
      this.showQrDisplay = true;
    },

    displayMyQrCode() {
      // TODO: hier Code aus vorigen Beispielen einfügen
    },
  },

  watch: {
    // immer wenn sich das eigene Profil ändert, sollen die Änderungen gespeichert werden
    profile: {
      handler() {
        this.setProfile(this.profile);
        this.displayMyQrCode();
      },
      deep: true,
    },
  },

  // beim Öffnen der Seite werden die Daten direkt geladen
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #eee;
}

#app {
  max-width: 400px;
  height: 100%;
  overflow: auto;
  margin: auto;
  background-color: white;
  padding: 10px;

  .modal {
    position: fixed;
    background-color: white;
    top: 0px;
    width: 100%;
    margin-left: -10px;
    max-width: 400px;
    height: 100%;
    .close-modal {
      cursor: pointer;
      padding: 10px;
      text-align: right;
      font-weight: bold;
      font-size: 24px;
    }
  }

  #toolbar {
    display: flex;
    justify-content: space-around;
    button {
      padding: 10px;
    }
  }

  #qrDisplayModal {
    canvas {
      width: 100% !important;
      height: auto !important;
    }
  }

  #qrReader {
    video {
      height: 100%;
      width: 100%;
    }
  }

  #profile {
    h6 {
      margin: 0;
    }
    input {
      width: 100%;
      padding: 5px;
      margin: 5px 0;
    }

    #myQrDisplay {
      margin: 5px 25px;
      width: calc(100% - 50px) !important;
      height: auto !important;
    }
  }

  #contacts {
    #no-contacts {
      text-align: center;
      font-style: italic;
      margin: 50px 0;
    }
    .contact {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      line-height: 1.25;

      .contact-name {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .contact-email {
        // kein besonderes Styling
      }
      .contact-phone {
        font-style: italic;
      }
      .contact-toolbar {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        button {
          width: 45%;
        }
      }
    }
  }
}
</style>
