"""empty message

Revision ID: e3ad93b5dc5e
Revises: 8f907068becd
Create Date: 2025-01-29 23:42:23.596589

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e3ad93b5dc5e'
down_revision = '8f907068becd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hotel', schema=None) as batch_op:
        batch_op.add_column(sa.Column('room_types', sa.JSON(), nullable=False))
        batch_op.drop_column('types_of_rooms')

    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('rating', sa.Float(), nullable=False))
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.drop_column('sentiment')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('loyalty_points', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('loyalty_points')

    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sentiment', mysql.VARCHAR(length=50), nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('rating')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('hotel', schema=None) as batch_op:
        batch_op.add_column(sa.Column('types_of_rooms', mysql.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('room_types')

    # ### end Alembic commands ###
