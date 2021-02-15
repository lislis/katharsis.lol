import gdprCopy from './gdpr_de'

export default {
  index: {
    claim: "Ein Onlinewerkzeug für das gemeinsame Verfassen<br> der Theatertexte von morgen",
    defaultText: "Be excellent to each other!",
    watch: "Zusehen",
    participate: "Teilnehmen",
  },
  intro: {
    enter: "Eintreten",
    yourNameIs: "Du nimmst Teil als",
    toRoom: "Gehe weiter",
    noMore: "Du willst nicht mehr?",
    leave: "Austreten",
    callMeByAnyName: "Bitte gib hier deinen Usernamen ein.<br>Der ist dann auch gleichzeitig der Name eurer Figur."
  },
  main: {
    pleaseWait: "Bitte warten"
  },
  user: {
    notice: {
      enter: "ist eingetreten",
      leave: "ist ausgetreten"
    },
    notification: {
      onstage: "Auf die Bühne!",
      offstage: "Runter von der Bühne!",
      isMod: "Du bist jetzt Moderator:in",
      isUser: "Du bist jetzt Teilnehmer:in",
      wasRemoved: "Du wurdest gebeten zu gehen.",
      reallyLeave: "Willst du wirklich austreten?<br>Ohne einen weiteren Ticketcode kannst du nicht mehr eintreten.",
      reallyLeaveBtn: "Wirklich austreten",
      back: "Zurück"
    },
    status: {
      stage: "Auf der Bühne",
      mod: "Moderator:in"
    }
  },
  ui: {
    button: {
      toIndex: "Zum Start",
      close: "schließen",
      send: "Schreiben",
      accept: "Okay!"
    },
    form: {
      chat: "Schreibe etwas",
      placeholderSpeech: "Was sagst du?",
      placeholderInstruction: "Was soll passieren?",
      thereIsTyping: "Es wird getippt",
      directSpeech: "Direkte Rede",
      stageInstruction: "Bühnenanweisung",
      langSwitch: "Sprache ändern"
    },
    chat: {
      scrollDown: "Neue Nachricht, scrolle runter",
      peopleList: "Darsteller im Raum",
      emojiPicker: "Emoji auswählen"
    }
  },
  spec: {
    title: "Zuschauerraum"
  },
  part: {
    title: "Teilnehmen",
    label: "Wer willst du sein?",
    ticket: "Ticketcode",
    invalidTicket: "Kein oder invalider Ticketcode!",
    usedTicket: "Ticketcode bereits genutzt!",
  },
  legal: {
    imprint: "Impressum",
    gdpr: "Datenschutzhinweise",
    gdprCopy: gdprCopy,
    gdprFurther: "Weitere Datenschutzhinweise der Administrierenden",
    gpdrLink: "Weitere Datenschutzhinweise der Administrierenden.",
    gpdrNoLink: "Keine weiteren Datenschutzhinweise der Administrierenden."
  }
}
