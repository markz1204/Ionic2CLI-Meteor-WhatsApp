import * as Gm from 'gm';
import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import { Picture } from 'api/models/ufs';

export const Pictures = new MongoObservable.Collection<Picture>('pictures');

export const PicturesStore = new UploadFS.store.GridFS({
  collection: Pictures.collection,
  name: 'pictures',
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  permissions: new UploadFS.StorePermissions({
    insert: Boolean,
    update: Boolean,
    remove: Boolean
  }),
  transformWrite(from, to, fileId, file) {
    // Compress
    Gm(from, file.name)
      .quality(75)
      .stream()
      .pipe(to);
  }
});