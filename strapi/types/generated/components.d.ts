import type { Schema, Struct } from '@strapi/strapi';

export interface NotesNota extends Struct.ComponentSchema {
  collectionName: 'components_notes_notas';
  info: {
    displayName: 'nota';
  };
  attributes: {};
}

export interface NotesNotasfragancia extends Struct.ComponentSchema {
  collectionName: 'components_notes_notasfragancias';
  info: {
    displayName: 'notasfragancia';
  };
  attributes: {
    notasFinal: Schema.Attribute.String;
  };
}

export interface NotesNote extends Struct.ComponentSchema {
  collectionName: 'components_notes_notes';
  info: {
    description: '';
    displayName: 'Note';
  };
  attributes: {
    notasfinal: Schema.Attribute.Component<'notes.notasfragancia', true>;
    type: Schema.Attribute.Enumeration<
      ['topNotes', 'middleNotes', 'baseNotes']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'notes.nota': NotesNota;
      'notes.notasfragancia': NotesNotasfragancia;
      'notes.note': NotesNote;
    }
  }
}
